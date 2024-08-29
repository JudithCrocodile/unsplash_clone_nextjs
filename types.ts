export type TypePhoto = {
    _id: number,
    path: string,
    title: string,
    descriptio: string,
    author: string,
    authorAavatar: string,
    location: string,
    createTime: string,
    photo_tags: TypeTag[],
    fileId: string,
    liked: boolean

}

export type TypeTag = {
    _id: number,
    name: string,
    created_at: string,
}

export type TypeUser = {
    _id: number,
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