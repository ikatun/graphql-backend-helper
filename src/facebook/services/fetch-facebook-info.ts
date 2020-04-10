import axios from 'axios';

export interface IFacebookApiResponse {
  email: string;
  name: string;
  id: string;
}

export async function fetchFacebookInfo(facebookAccessToken: string) {
  const { data: fbResponse } = await axios.get<IFacebookApiResponse>(
    `https://graph.facebook.com/me?access_token=${facebookAccessToken}&fields=name,email`
  );

  return fbResponse;
}
