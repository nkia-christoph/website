// sheets: general, sensitive
export interface IGeneral {
  readonly key: string
  readonly value_uni: string
  readonly value_de:  string
  readonly value_en:  string
}

// sheets: cv
export interface ICV {
  readonly type:       string
  readonly title_de:   string
  readonly title_en:   string
  readonly entity_uni: string
  readonly entity_de:  string
  readonly entity_en:  string
  readonly content_de: string
  readonly content_en: string
  readonly logo:       string
  readonly date_from:  string
  readonly date_to:    string
           show:       boolean
}

// sheets: testimonials
export interface ITestimonials {
  readonly name:       string
  readonly project_id: string
  readonly content_de: string
  readonly content_en: string
           show:       boolean
}

// sheets: projects, blog
export interface IArticle {
  readonly id:         number
  readonly title_de:   string
  readonly title_en:   string
  readonly content_de: string
  readonly content_en: string
  readonly image:      string
  readonly seo:        string
  readonly date_from:  string
  readonly date_to:    string
  readonly created:    string
  readonly modified:   string
           show:       boolean
}

// created at build
export interface IVersion {
  readonly deno:        string
  readonly v8:          string
  readonly typescript:  string
  readonly nanojsx:     string
  readonly deploy_date: string
}