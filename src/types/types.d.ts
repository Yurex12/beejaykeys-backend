type User = {
  id: string;
};

declare namespace Express {
  export interface Request {
    user: User;
  }
}

type FaqRequestBody = {
  question: string;
  answer: string;
};
type TestimonialRequestBody = {
  name: string;
  review: string;
};

type RequestParams = {
  id: string;
};

type LinkRequestParams = {
  name: 'x' | 'instagram' | 'telegram';
};

type LinkRequestBody = {
  url: string;
};

type UserRequestBody = {
  email: string;
  username: string;
  password: string;
};

// type ServiceRequestBody = {
//   description:
// }
