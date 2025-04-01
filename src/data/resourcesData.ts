
import { Resource } from '@/models/Resource';

export const resourcesData: Resource[] = [
  {
    id: "1",
    title: "Introduction to Data Analytics",
    description: "A comprehensive guide to data analytics fundamentals",
    category: "Learning",
    type: "ebook",
    url: "https://example.com/intro-data-analytics",
    tags: ["beginner", "analytics", "guide"],
    dateAdded: "2023-10-15",
    featured: true
  },
  {
    id: "2",
    title: "Advanced SQL for Data Scientists",
    description: "Master SQL queries for complex data analysis",
    category: "Database",
    type: "course",
    url: "https://example.com/advanced-sql",
    tags: ["sql", "advanced", "database"],
    dateAdded: "2023-11-02"
  },
  {
    id: "3",
    title: "Python for Data Analysis",
    description: "Learn how to use Python for data manipulation and analysis",
    category: "Programming",
    type: "video",
    url: "https://example.com/python-data-analysis",
    tags: ["python", "pandas", "numpy"],
    dateAdded: "2023-09-20",
    featured: true
  },
  {
    id: "4",
    title: "Data Visualization Best Practices",
    description: "Guidelines for creating effective and informative visualizations",
    category: "Visualization",
    type: "article",
    url: "https://example.com/data-viz-best-practices",
    tags: ["visualization", "charts", "design"],
    dateAdded: "2023-12-05"
  },
  {
    id: "5",
    title: "Machine Learning Algorithms Explained",
    description: "A simple breakdown of common machine learning algorithms",
    category: "Machine Learning",
    type: "article",
    url: "https://example.com/ml-algorithms",
    tags: ["machine learning", "algorithms", "AI"],
    dateAdded: "2023-11-15",
    featured: true
  },
  {
    id: "6",
    title: "Tableau Dashboard Tutorial",
    description: "Step-by-step guide to creating interactive dashboards in Tableau",
    category: "Visualization",
    type: "video",
    url: "https://example.com/tableau-dashboard",
    tags: ["tableau", "dashboard", "visualization"],
    dateAdded: "2023-10-28"
  },
  {
    id: "7",
    title: "Big Data Tools Comparison",
    description: "An analysis of popular big data processing frameworks",
    category: "Big Data",
    type: "article",
    url: "https://example.com/big-data-tools",
    tags: ["hadoop", "spark", "big data"],
    dateAdded: "2023-12-10"
  },
  {
    id: "8",
    title: "Data Ethics and Privacy",
    description: "Understanding ethical considerations in data analytics",
    category: "Ethics",
    type: "ebook",
    url: "https://example.com/data-ethics",
    tags: ["ethics", "privacy", "compliance"],
    dateAdded: "2023-09-05"
  },
  {
    id: "9",
    title: "R Programming for Statistical Analysis",
    description: "Learn statistical analysis using R programming language",
    category: "Programming",
    type: "course",
    url: "https://example.com/r-statistics",
    tags: ["R", "statistics", "programming"],
    dateAdded: "2023-11-20"
  },
  {
    id: "10",
    title: "Natural Language Processing Fundamentals",
    description: "Introduction to processing and analyzing text data",
    category: "Machine Learning",
    type: "video",
    url: "https://example.com/nlp-fundamentals",
    tags: ["NLP", "text analytics", "machine learning"],
    dateAdded: "2023-10-10"
  },
  {
    id: "11",
    title: "Excel for Data Analysis",
    description: "Advanced Excel techniques for data analysts",
    category: "Tools",
    type: "course",
    url: "https://example.com/excel-analysis",
    tags: ["excel", "spreadsheet", "analysis"],
    dateAdded: "2023-12-01"
  },
  {
    id: "12",
    title: "Data Cleaning Best Practices",
    description: "Methods to prepare and clean data for analysis",
    category: "Data Preparation",
    type: "article",
    url: "https://example.com/data-cleaning",
    tags: ["data cleaning", "preprocessing", "quality"],
    dateAdded: "2023-09-15"
  }
];

export const categories = [...new Set(resourcesData.map(resource => resource.category))];
export const resourceTypes = ["video", "article", "ebook", "tool", "course", "other"];

export function getAllTags(): string[] {
  const allTags = resourcesData.flatMap(resource => resource.tags);
  return [...new Set(allTags)];
}
