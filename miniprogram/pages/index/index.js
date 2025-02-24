// 定义小程序页面
Page({
  // 页面的初始数据
  data: {
    currentFood: {
      name: '点击下方按钮开始',
      image: '🍽️',
      category: '开始'
    },
    isAnimating: false,
    isLoading: false,
    isFirstClick: true,

  onLoad() {
    wx.onError((error) => {
      if (error.message.includes('Failed to load image')) {
        this.setData({
          'currentFood.image': 'https://at.alicdn.com/t/c/font_4345144_default.svg',
          isLoading: false
        });
        wx.showToast({
          title: '图片加载失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
    foodTypes: {
      '中餐': [
        { name: '川菜', image: '🌶️' },
        { name: '粤菜', image: '🥘' },
        { name: '湘菜', image: '🍲' },
        { name: '鲁菜', image: '🍖' },
        { name: '苏菜', image: '🥗' },
        { name: '浙菜', image: '🐟' },
        { name: '闽菜', image: '🦐' },
        { name: '徽菜', image: '🍱' },
        { name: '小龙虾', image: '🦞' },
        { name: '麻辣香锅', image: '🥘' },
        { name: '酸菜鱼', image: '🐟' },
        { name: '东坡肉', image: '🥓' }
      ],
      '西餐': [
        { name: '意大利面', image: '🍝' },
        { name: '牛排', image: '🥩' },
        { name: '披萨', image: '🍕' },
        { name: '汉堡', image: '🍔' },
        { name: '沙拉', image: '🥗' },
        { name: '三明治', image: '🥪' },
        { name: '烤鸡', image: '🍗' },
        { name: '法式蜗牛', image: '🐌' },
        { name: '奶油蘑菇汤', image: '🍲' },
        { name: '西班牙海鲜饭', image: '🥘' },
        { name: '希腊沙拉', image: '🥗' },
        { name: '法式可丽饼', image: '🥞' }
      ],
      '日料': [
        { name: '寿司', image: '🍣' },
        { name: '拉面', image: '🍜' },
        { name: '刺身', image: '🐟' },
        { name: '天妇罗', image: '🍤' },
        { name: '烤肉', image: '🥓' },
        { name: '盖饭', image: '🍚' },
        { name: '乌冬面', image: '🍜' },
        { name: '抹茶甜点', image: '🍵' },
        { name: '章鱼烧', image: '🐙' },
        { name: '味增汤', image: '🥣' },
        { name: '亲子丼', image: '🍛' },
        { name: '炸猪排', image: '🍖' }
      ],
      '快餐': [
        { name: '炸鸡', image: '🍗' },
        { name: '便当', image: '🍱' },
        { name: '盖浇饭', image: '🍚' },
        { name: '炒面', image: '🍜' },
        { name: '煎饼', image: '🥞' },
        { name: '肯德基', image: '🍗' },
        { name: '麦当劳', image: '🍔' },
        { name: '炸薯条', image: '🍟' },
        { name: '鸡肉卷', image: '🌯' },
        { name: '蛋包饭', image: '🍳' },
        { name: '炒饭', image: '🍚' },
        { name: '关东煮', image: '🍢' }
      ],
      '小吃': [
        { name: '饺子', image: '🥟' },
        { name: '包子', image: '🥟' },
        { name: '馄饨', image: '🥟' },
        { name: '面食', image: '🍜' },
        { name: '炒粉', image: '🍜' },
        { name: '肠粉', image: '🥗' },
        { name: '煎饼果子', image: '🥞' },
        { name: '臭豆腐', image: '🧊' },
        { name: '烤冷面', image: '🥘' },
        { name: '锅贴', image: '🥟' },
        { name: '炸串', image: '🍢' },
        { name: '糯米鸡', image: '🍙' }
      ],
      '特色': [
        { name: '火锅', image: '🍲' },
        { name: '烧烤', image: '🍖' },
        { name: '麻辣烫', image: '🌶️' },
        { name: '烤鱼', image: '🐟' },
        { name: '海鲜', image: '🦐' },
        { name: '韩式料理', image: '🍚' },
        { name: '泰国菜', image: '🥘' },
        { name: '越南河粉', image: '🍜' },
        { name: '印度咖喱', image: '🍛' },
        { name: '墨西哥卷饼', image: '🌯' },
        { name: '中东烤肉', image: '🥙' },
        { name: '俄罗斯红菜汤', image: '🥣' }
      ]
    },
    recentFoods: [],
    maxRecentCount: 10
  },

  onLoad() {
    wx.onError((error) => {
      if (error.message.includes('Failed to load image')) {
        this.setData({
          'currentFood.image': 'https://at.alicdn.com/t/c/font_4345144_default.svg',
          isLoading: false
        });
        wx.showToast({
          title: '图片加载失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  // 预加载所有图片
  preloadImages() {
    const allFoods = [];
    for (let category in this.data.foodTypes) {
      allFoods.push(...this.data.foodTypes[category]);
    }
    
    allFoods.forEach(food => {
      wx.getImageInfo({
        src: food.image,
        fail: () => {
          console.warn(`Failed to preload image: ${food.image}`);
        }
      });
    });
  },

  randomFood() {
    this.setData({ 
      isAnimating: true,
      isLoading: true
    });

    let allFoods = [];
    let foodWithCategory = [];
    for (let category in this.data.foodTypes) {
      const foodsInCategory = this.data.foodTypes[category].map(food => ({
        ...food,
        category: category
      }));
      foodWithCategory = foodWithCategory.concat(foodsInCategory);
    }

    let availableFoods = foodWithCategory.filter(food => 
      !this.data.recentFoods.some(recent => recent.name === food.name)
    );

    if (availableFoods.length < 5) {
      availableFoods = foodWithCategory;
      this.setData({ recentFoods: [] });
    }

    const randomIndex = Math.floor(Math.random() * availableFoods.length);
    const selectedFood = availableFoods[randomIndex];

    let recentFoods = this.data.recentFoods;
    recentFoods.push(selectedFood);
    if (recentFoods.length > this.data.maxRecentCount) {
      recentFoods.shift();
    }

    this.setData({
      currentFood: selectedFood,
      recentFoods: recentFoods
    });

    setTimeout(() => {
      this.setData({ 
        isAnimating: false,
        isLoading: false,
        isFirstClick: false
      });
    }, 500);
  }
})