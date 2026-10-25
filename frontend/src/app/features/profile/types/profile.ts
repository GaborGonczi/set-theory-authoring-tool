import { ProfileInfo } from "@src/app/features/profile/models/profile-info";

export type InfoResponse = {
    profileInfo:ConstructorParameters<typeof ProfileInfo>[0];
}

export type ErrorResponse = {
  error: {message:string};
}