export interface IPhoto {
      id: Number,
      img: String,
      title: String,
      descriptio: String,
      author: String,
      authorAavatar: String,
      location: String,
      createTime: String,
      photo_tags: Tag[]
  
}

export interface ITag {
    id: Number,
    name: String,
    created_at: String,
}

export interface IUser {
    id: Number,
    userName: String,
    email: String,
    password: String,
    created_at: String,
    updated_at: String,
}