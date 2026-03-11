import { apiRequest } from './client';
import { TypePhoto, TypeTag, TypeUser } from '@/types';

export type LoginPayload = {
  email: string;
  password: string;
};

export type CreateUserPayload = {
  email: string;
  password: string;
  userName: string;
  firstName: string;
  lastName: string;
};

export type ForgotPasswordPayload = {
  email: string;
  password?: string;
};

export type ResetPasswordPayload = {
  password: string;
  resetTokenHash: string | string[];
};

export type UpdateUserInfoPayload = {
  currentPassword?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
};

export type UploadPhotoPayload = {
  photos: Array<{
    url: string;
    publicId?: string;
    tabs?: string[];
    location?: string;
    description?: string;
  }>;
};

export type GetPhotoPagePayload = {
  page: number;
  tabId?: string | string[];
  category?: string | null;
  userName?: string | string[];
  onlyShowLiked?: boolean;
};

type GetPhotoPageResponse = {
  photos: TypePhoto[];
  currentPage: number;
  totalPhotos: number;
  totalPages: number;
  isLast: boolean;
};

export const userApi = {
  login: (payload: LoginPayload) =>
    apiRequest<{ token: string; userInfo: TypeUser }>('/user/login', {
      method: 'POST',
      json: payload,
    }),

  createUser: (payload: CreateUserPayload) =>
    apiRequest<{ userId: string }>('/user/create-user', {
      method: 'POST',
      json: payload,
    }),

  forgotPassword: (payload: ForgotPasswordPayload) =>
    apiRequest('/user/forgot-password', {
      method: 'POST',
      json: payload,
    }),

  resetPassword: (payload: ResetPasswordPayload) =>
    apiRequest<TypeUser>('/user/reset-password', {
      method: 'POST',
      json: payload,
    }),

  updatePassword: (token: string, userInfo: UpdateUserInfoPayload) =>
    apiRequest<TypeUser>('/user/update-password', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: { userInfo },
    }),

  closeAccount: (token: string, userInfo: UpdateUserInfoPayload) =>
    apiRequest('/user/close-account', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: { userInfo },
    }),

  updateUser: (token: string, userInfo: UpdateUserInfoPayload) =>
    apiRequest<TypeUser>('/user/update-user', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: { userInfo },
    }),

  uploadAvatar: (token: string, formData: FormData) =>
    apiRequest<string>('/user/upload-avatar', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }),

  logout: () =>
    apiRequest('/user/logout', {
      method: 'POST',
    }),
};

export const photoApi = {
  upload: (token: string, payload: UploadPhotoPayload) =>
    apiRequest('/photo/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: payload,
    }),

  getPhotoPage: (token: string | null | undefined, payload: GetPhotoPagePayload) =>
    apiRequest<GetPhotoPageResponse>('/photo/get-photo-page', {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      json: payload,
    }),

  getPhotoDetail: (token: string | null | undefined, photoId: string) =>
    apiRequest<TypePhoto>(`/photo/get-photo/${photoId}`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    }),
};

export const tabApi = {
  getTabs: () =>
    apiRequest<TypeTag[]>('/tab/get-tabs', {
      method: 'POST',
    }),
};

export const likeApi = {
  toggle: (payload: { photoId: string; userId: string }) =>
    apiRequest<boolean>('/like', {
      method: 'POST',
      json: payload,
    }),
};
