export interface SignupResponse{
    statusCode: number,
    message: string
}

export interface LoginResponse{
    statusCode: number,
    message: string,
    userInfo: UserInfo
}

export interface UserInfo{
    userId: string,
    name: string,
}