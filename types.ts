export type TypePhoto = {
      id: Number,
      path: string,
      title: string,
      descriptio: String,
      author: String,
      authorAavatar: String,
      location: String,
      createTime: String,
      photo_tags: TypeTag[]
  
}

export type TypeTag = {
    id: Number,
    name: String,
    created_at: String,
}

export type TypeUser = {
    id: Number,
    userName: String,
    email: String,
    password: String,
    created_at: String,
    updated_at: String,  
    firstName: String,
    lastName: String,
}