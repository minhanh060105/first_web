import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'iPhone 15 Pro', price: 999, category: 'Điện thoại' },
  { id: 2, name: 'MacBook Air M3', price: 1099, category: 'Máy tính' },
  { id: 3, name: 'iPad Pro OLED', price: 799, category: 'Máy tính bảng' },
  { id: 4, name: 'Apple Watch Ultra 2', price: 799, category: 'Phụ kiện' }
];

export default function TabCrud() {
  const [activeTab, setActiveTab] = useState('edition'); // 'edition' or 'search'
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // Form State
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formCategory, setFormCategory] = useState('Điện thoại');
  const [editingId, setEditingId] = useState(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');

  // Validation State
  const [errorName, setErrorName] = useState(false);
  const [errorPrice, setErrorPrice] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate
    let hasError = false;
    if (!formName.trim()) {
      setErrorName(true);
      hasError = true;
    } else {
      setErrorName(false);
    }

    if (!formPrice || isNaN(formPrice) || parseFloat(formPrice) <= 0) {
      setErrorPrice(true);
      hasError = true;
    } else {
      setErrorPrice(false);
    }

    if (hasError) return;

    if (editingId) {
      // Edit mode
      setProducts(products.map(p => 
        p.id === editingId 
          ? { ...p, name: formName, price: parseFloat(formPrice), category: formCategory } 
          : p
      ));
      setEditingId(null);
    } else {
      // Create mode
      const newProduct = {
        id: Date.now(),
        name: formName,
        price: parseFloat(formPrice),
        category: formCategory
      };
      setProducts([...products, newProduct]);
    }

    // Reset Form
    setFormName('');
    setFormPrice('');
    setFormCategory('Điện thoại');
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormName(product.name);
    setFormPrice(product.price.toString());
    setFormCategory(product.category);
  };

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      setProducts(products.filter(p => p.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setFormName('');
        setFormPrice('');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormName('');
    setFormPrice('');
    setFormCategory('Điện thoại');
    setErrorName(false);
    setErrorPrice(false);
  };

  // Filter products for Search Tab
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = searchCategory === 'All' || p.category === searchCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['Điện thoại', 'Máy tính', 'Máy tính bảng', 'Phụ kiện'];

  return (
    <div className="tab-container">
      {/* Tab Navigation */}
      <div className="tab-nav">
        <button
          onClick={() => setActiveTab('edition')}
          className={`tab-btn ${activeTab === 'edition' ? 'active' : ''}`}
        >
          Tab 1: Quản lý sản phẩm (Edition)
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`tab-btn ${activeTab === 'search' ? 'active' : ''}`}
        >
          Tab 2: Tìm kiếm & Tra cứu (Search)
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'edition' ? (
          <div className="crud-layout animate-fade-in">
            {/* Form */}
            <form onSubmit={handleSubmit} className="crud-form glass-panel">
              <h3 className="font-bold text-sm mb-4">
                {editingId ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
              </h3>
              
              <div className="form-group">
                <label className="form-label">Tên sản phẩm</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => {
                    setFormName(e.target.value);
                    if (e.target.value.trim()) setErrorName(false);
                  }}
                  className={`form-input ${errorName ? 'error' : ''}`}
                  placeholder="Nhập tên..."
                />
                {errorName && <span className="error-text">Tên không được bỏ trống</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Giá sản phẩm ($)</label>
                <input
                  type="number"
                  value={formPrice}
                  onChange={(e) => {
                    setFormPrice(e.target.value);
                    if (e.target.value && !isNaN(e.target.value)) setErrorPrice(false);
                  }}
                  className={`form-input ${errorPrice ? 'error' : ''}`}
                  placeholder="Nhập giá..."
                />
                {errorPrice && <span className="error-text">Giá phải lớn hơn 0</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Danh mục</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="custom-select"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 mt-4">
                <button type="submit" className="btn btn-primary btn-sm flex-grow">
                  <Plus size={16} />
                  {editingId ? 'Cập nhật' : 'Thêm mới'}
                </button>
                {editingId && (
                  <button type="button" onClick={handleCancelEdit} className="btn btn-secondary btn-sm">
                    Hủy
                  </button>
                )}
              </div>
            </form>

            {/* List */}
            <div className="crud-list">
              <h3 className="font-bold text-sm mb-2">Danh sách Sản phẩm</h3>
              {products.length === 0 ? (
                <div className="glass-panel p-4 text-center text-muted text-sm">
                  Chưa có sản phẩm nào.
                </div>
              ) : (
                products.map(p => (
                  <div key={p.id} className="crud-item glass-card">
                    <div>
                      <h4 className="font-semibold text-sm">{p.name}</h4>
                      <p className="text-xs text-muted">
                        {p.category} • <span className="text-secondary font-semibold">${p.price}</span>
                      </p>
                    </div>
                    <div className="crud-item-actions">
                      <button
                        onClick={() => handleEdit(p)}
                        className="btn btn-secondary btn-sm p-2"
                        title="Sửa"
                      >
                        <Edit2 size={14} className="text-primary" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="btn btn-danger btn-sm p-2"
                        title="Xóa"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          /* Search Tab */
          <div className="search-tab-content animate-fade-in">
            {/* Search Filter Panel */}
            <div className="search-box-wrapper glass-panel p-4">
              <div className="flex items-center gap-2 flex-grow position-relative">
                <Search size={18} className="text-muted" style={{ position: 'absolute', left: '14px' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm theo tên..."
                  className="form-input w-full search-input"
                  style={{ paddingLeft: '44px' }}
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter size={18} className="text-muted" />
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="custom-select"
                  style={{ minWidth: '150px' }}
                >
                  <option value="All">Tất cả danh mục</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid-3 mt-4">
              {filteredProducts.length === 0 ? (
                <div className="glass-panel p-8 text-center text-muted text-sm w-full" style={{ gridColumn: '1 / -1' }}>
                  Không tìm thấy sản phẩm nào phù hợp với từ khóa tìm kiếm.
                </div>
              ) : (
                filteredProducts.map(p => (
                  <div key={p.id} className="glass-card p-4 flex flex-direction-column gap-2">
                    <span className="badge text-xs" style={{ alignSelf: 'flex-start' }}>
                      {p.category}
                    </span>
                    <h4 className="font-bold text-sm mt-2">{p.name}</h4>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-secondary font-bold">${p.price}</span>
                      <span className="text-xs text-muted">ID: {p.id}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
