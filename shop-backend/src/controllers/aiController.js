import { GoogleGenerativeAI } from '@google/generative-ai';
import Product from '../models/Product.js';

export const chatWithAI = async (req, res, next) => {
    try {
        const { message, history } = req.body;
        if (!message) {
            return res.status(400).json({ success: false, message: 'Message không được để trống.' });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey || apiKey.trim() === '') {
            return res.status(200).json({ 
                success: false, 
                message: 'Chào bạn! Mình là AI Candycore. Hiện tại chủ cửa hàng chưa cấu hình API Key của Gemini nên mình chưa thể trả lời thông minh được. Vui lòng cấu hình GEMINI_API_KEY trong file .env của backend để bắt đầu trò chuyện cùng mình nhé! 💕' 
            });
        }

        // Lấy tất cả sản phẩm đang hoạt động để làm dữ liệu nền
        const dbProducts = await Product.findAll({ where: { status: 'ACTIVE' } });
        
        // Rút gọn thông tin sản phẩm để giảm token gửi lên Gemini
        const productListStr = dbProducts.map(p => ({
            id: p.productId,
            name: p.productName,
            description: p.description,
            price: p.price,
            category: p.category,
            character: p.character
        }));

        // Khởi tạo Gemini
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-3.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "object",
                    properties: {
                        text: { type: "string" },
                        recommendedProductIds: {
                            type: "array",
                            items: { type: "integer" }
                        }
                    },
                    required: ["text", "recommendedProductIds"],
                },
            },
            systemInstruction: `Bạn là Candycore AI, trợ lý bán hàng và hỗ trợ khách hàng cực kỳ ngọt ngào, dễ thương, thân thiện của "Candycore Museum" và "Candycore Shop" (Cửa hàng quà tặng chính thức của bảo tàng).
Candycore Museum là một không gian trải nghiệm nghệ thuật số tương tác cực kỳ ngọt ngào theo chủ đề các nhân vật Sanrio dễ thương (như Hello Kitty, Kuromi, My Melody, Cinnamoroll, Pompompurin, Pochacco, v.v.).

Thông tin quan trọng bạn cần nắm rõ:
- Địa chỉ (Văn phòng giao dịch / Bảo tàng): Tầng 6, Toà nhà Toyota, 315 Trường Chinh, Hà Nội.
- Hotline đặt vé và hỗ trợ: 19006789.
- Email liên hệ: Candycorevietnam@gmai.com.

Nhiệm vụ của bạn:
1. Trò chuyện cực kỳ ngọt ngào, sử dụng các từ ngữ dễ thương như "bạn yêu", "nè", "nha", "đó", các icon như 🌸, 🎀, 💕, 🧸, ✨.
2. Cung cấp thông tin về bảo tàng Candycore Museum (địa chỉ, số điện thoại đặt vé, email) khi khách hỏi về địa chỉ, liên hệ hoặc thông tin bảo tàng.
3. Tư vấn sản phẩm và gợi ý quà tặng dựa trên yêu cầu, sở thích hoặc ngân sách (budget) của khách hàng.
4. Khi gợi ý sản phẩm, hãy dựa VÀO DANH SÁCH SẢN PHẨM THỰC TẾ của cửa hàng được cung cấp dưới đây. KHÔNG tự chế ra sản phẩm không có trong danh sách.
5. Trả về định dạng JSON gồm:
   - "text": câu trả lời, tư vấn của bạn dành cho khách hàng. Hãy giới thiệu ngắn gọn các sản phẩm nổi bật phù hợp với nhu cầu của họ hoặc giải đáp các thắc mắc về địa chỉ/thông tin liên hệ của bảo tàng.
   - "recommendedProductIds": mảng chứa ID (số nguyên) các sản phẩm bạn muốn đề xuất (nếu có, tối à 3 sản phẩm). Nếu không có sản phẩm nào phù hợp hoặc khách chỉ hỏi về địa chỉ/thông tin bảo tàng/chào hỏi bình thường, hãy trả về mảng rỗng [].

Danh sách sản phẩm của cửa hàng:
${JSON.stringify(productListStr, null, 2)}`
        });

        // Chuyển đổi lịch sử chat từ client sang định dạng Gemini
        // Lịch sử client gửi lên dạng: [{ sender: 'user'|'bot', text: '...' }]
        const geminiHistory = [];
        if (history && Array.isArray(history)) {
            // Lấy tối đa 10 tin nhắn gần nhất để tránh quá tải token
            const recentHistory = history.slice(-10);
            for (const h of recentHistory) {
                if (h.text && h.sender) {
                    geminiHistory.push({
                        role: h.sender === 'user' ? 'user' : 'model',
                        parts: [{ text: h.text }]
                    });
                }
            }
        }

        const chatSession = model.startChat({
            history: geminiHistory
        });

        const result = await chatSession.sendMessage(message);
        const responseText = result.response.text();
        
        let aiResultData;
        try {
            aiResultData = JSON.parse(responseText);
        } catch (e) {
            console.error("Lỗi parse JSON từ Gemini response:", responseText);
            aiResultData = {
                text: responseText,
                recommendedProductIds: []
            };
        }

        // Lấy thông tin chi tiết các sản phẩm được AI đề xuất để trả về frontend
        const recommendedProducts = [];
        if (aiResultData.recommendedProductIds && Array.isArray(aiResultData.recommendedProductIds)) {
            for (const id of aiResultData.recommendedProductIds) {
                const found = dbProducts.find(p => p.productId === id);
                if (found) {
                    recommendedProducts.push({
                        productId: found.productId,
                        productName: found.productName,
                        description: found.description,
                        price: found.price,
                        category: found.category,
                        character: found.character,
                        imageUrl: found.imageUrl
                    });
                }
            }
        }

        return res.json({
            success: true,
            data: {
                text: aiResultData.text,
                products: recommendedProducts
            }
        });

    } catch (error) {
        next(error);
    }
};
