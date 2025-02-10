export interface Page {
  id: string;
  pageTitle: string;
  name: string;
}

export interface CategoryPage extends Page {
  categoryImage: string;
  backgroundColor: string;
}
