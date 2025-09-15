import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, ShoppingCart, TrendingUp } from 'lucide-react';

const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const startValue = 0;
    const endValue = end;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const StatCard = ({ title, value, icon: Icon, color, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>
            {title.includes('Revenue') ? (
              <span>$<AnimatedCounter end={value} /></span>
            ) : title.includes('Rate') ? (
              <span><AnimatedCounter end={value * 10} />%</span>
            ) : (
              <AnimatedCounter end={value} />
            )}
          </p>
        </div>
        <div className={`p-3 rounded-lg ${color.replace('text-', 'bg-').replace('-500', '-500/20')}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </motion.div>
  );
};

const StatsCards = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <div className="skeleton h-4 w-24 mb-2"></div>
            <div className="skeleton h-8 w-16 mb-4"></div>
            <div className="skeleton h-12 w-12 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: 'Total Revenue',
      value: data?.totalRevenue || 0,
      icon: DollarSign,
      color: 'text-green-500'
    },
    {
      title: 'Total Users',
      value: data?.totalUsers || 0,
      icon: Users,
      color: 'text-blue-500'
    },
    {
      title: 'Total Orders',
      value: data?.totalOrders || 0,
      icon: ShoppingCart,
      color: 'text-purple-500'
    },
    {
      title: 'Conversion Rate',
      value: data?.conversionRate || 0,
      icon: TrendingUp,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};

export default StatsCards;
