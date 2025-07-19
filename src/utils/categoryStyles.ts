// src/utils/categoryStyles.ts

export interface CategoryStyle {
    bar: string;
    text: string;
  }
  
  export const categoryStyles: Record<string, CategoryStyle> = {
    history: { bar: '#8C2325', text: '#FBF9F4' },
    economics: { bar: '#8C2325', text: '#FBF9F4' },
    personal_finance: { bar: '#2F4858', text: '#FBF9F4' },
    culture: { bar: '#B08A30', text: '#222326' },
    lifestyle: { bar: '#6F7F53', text: '#FBF9F4' },
    opinion: { bar: '#A02A2C', text: '#FBF9F4' }
  };
  
  export function getCategoryStyle(categorySlug: string): CategoryStyle {
    return categoryStyles[categorySlug] || { bar: '#8C2325', text: '#FBF9F4' };
  }
  
  export function getCategoryBarColor(categorySlug: string): string {
    return getCategoryStyle(categorySlug).bar;
  }
  
  export function getCategoryTextColor(categorySlug: string): string {
    return getCategoryStyle(categorySlug).text;
  }
  
  // For creating category badge styles
  export function getCategoryBadgeStyles(categorySlug: string) {
    const style = getCategoryStyle(categorySlug);
    return {
      backgroundColor: style.bar + '20', // 20% opacity background
      borderColor: style.bar,
      color: style.bar === '#B08A30' ? style.text : '#7f1d1d', // Special handling for culture category
      border: `2px solid ${style.bar}`
    };
  }
  
  // For creating selected/active category styles
  export function getActiveCategoryStyles(categorySlug: string) {
    const style = getCategoryStyle(categorySlug);
    return {
      backgroundColor: style.bar,
      color: style.text,
      border: `2px solid ${style.bar}`
    };
  }