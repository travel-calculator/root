import countries from 'i18n-iso-countries';
import ISO6391 from 'iso-639-1';
import { model, Schema } from 'mongoose';

export const ClientTypes = {
  Company: 1,
  Individual: 2,
};

const ClientSchema = new Schema(
  {
    country: {
      type: String,
      enum: Object.keys(countries.getAlpha2Codes()),
      required: true,
    },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    language: { type: String, enum: ISO6391.getAllCodes(), required: true },
  },
  {
    discriminatorKey: 'type',
  }
);
const ClientModel = model('Client', ClientSchema);

const ClientIndividualSchema = new Schema(
  {
    fullName: { type: String, required: true, unique: true },
  },
  {
    discriminatorKey: 'type',
  }
);

export const ClientIndividualModel = ClientModel.discriminator(
  ClientTypes.Individual,
  ClientIndividualSchema
);

const ClientCompanySchema = new Schema(
  {
    companyName: { type: String, required: true, unique: true },
  },
  {
    discriminatorKey: 'type',
  }
);
export const ClientCompanyModel = ClientModel.discriminator(
  ClientTypes.Company,
  ClientCompanySchema
);
