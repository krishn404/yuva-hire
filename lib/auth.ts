import { mockApiClient } from "./mock-api"

export const verifyToken = async (token: string) => {
  try {
    const response = await mockApiClient.getMe()
    if (!response.success || !response.data || !response.data.user) {
      return null
    }
    return response.data.user
  } catch (error) {
    return null
  }
}
