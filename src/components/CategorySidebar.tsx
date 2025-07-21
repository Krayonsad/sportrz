// components/CategorySidebar.tsx
'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Sidebar from './Sidebar';

export default function CategorySidebar({ activeCategory }: { activeCategory?: string }) {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesList: string[] = [];
        const categoriesSnapshot = await getDocs(collection(db, 'categories'));
        categoriesSnapshot.forEach((doc) => {
          categoriesList.push(doc.data().name);
        });
        setCategories(categoriesList);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="w-64 bg-white dark:bg-gray-800 h-screen animate-pulse"></div>;
  }

  return (
    <Sidebar 
      categories={categories} 
      onCategoryClick={() => {}}
      activeCategoryId={activeCategory}
    />
  );
}