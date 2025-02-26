export interface UserData {
  userData:{
    userId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    age?: number;
    gender?: string;
    imgUrl?: string;
    skills?: string[];
    about?: string;
  }
}
export interface FeedData{
  data:[
    {
      firstName:string;
      lastName?: string;
      age?: number;
      gender?: string;
      imgUrl?: string;
      skills?: string[]
    }
  ]
}

export interface connectionData{
    firstName?: string;
    lastName?: string;
    age?: number;
    gender?: string;
    imgUrl?: string;
    skills?: string[];
    about?: string;
}