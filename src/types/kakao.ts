interface Meta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
  same_name: SameName;
}

interface SameName {
  region: string[];
  keyword: string;
  selected_region: string;
}

interface Document {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string; //longitude
  y: string; //latitude
  place_url: string;
  distance: string;
}

interface SurroundResponse {
  meta: Meta;
  documents: Document[];
}
