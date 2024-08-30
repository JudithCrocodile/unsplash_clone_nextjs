export type TypePhoto = {
    _id: string,
    path: string,
    title: string,
    descriptio: string,
    author: TypeUser,
    authorAavatar: string,
    location: string,
    createTime: string,
    photo_tags: TypeTag[],
    fileId: string,
    liked: boolean,
    description: string,
}

export type TypeTag = {
    _id: string,
    name: string,
    created_at: string,
}

export type TypeUser = {
    _id: string,
    userName: string,
    email: string,
    password: string,
    created_at: string,
    updated_at: string,
    firstName: string,
    lastName: string,
    avatarPath: string,
    fileId: string,
}