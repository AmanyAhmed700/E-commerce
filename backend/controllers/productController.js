

// backend/controllers/productController.js
import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, category, description, sizes, colors } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "الاسم والسعر والفئة مطلوبة" });
    }

    const product = await Product.create({
      name,
      price,
      category,
      description,
      sizes: sizes ? sizes.split(",") : [],
      colors: colors ? colors.split(",") : [],
      image: req.file ? req.file.filename : null, // ✅ صورة واحدة فقط
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "خطأ في السيرفر", error: err.message });
  }
};


// جلب كل المنتجات
export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "خطأ في السيرفر" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "المنتج غير موجود" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "خطأ في السيرفر", error: err.message });
  }
};
// backend/controllers/productController.js

// controllers/productController.js
export const updateProduct = async (req, res) => {
  try {
    const { name, price, category, description, sizes, colors } = req.body;

    const updateData = {
      name,
      price,
      category,
      description,
      sizes: sizes ? sizes.split(",") : [],
      colors: colors ? colors.split(",") : [],
    };

    if (req.file) {
      updateData.image = req.file.filename; // ✅ نفس الحقل
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "المنتج غير موجود" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "المنتج غير موجود" });

    await product.deleteOne();
    res.json({ message: "تم حذف المنتج بنجاح" });
  } catch (err) {
    res.status(500).json({ message: "خطأ في السيرفر", error: err.message });
  }
};


export const searchProducts = async (req, res) => {
  try {
    const query = req.query.query || "";

    // نبحث في الحقول اللي موجودة ومتأكدين منها
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    res.json(products);
  } catch (error) {
    console.error("❌ Search error:", error);
    res.status(500).json({ message: error.message });
  }
};