export type PhoneNumber = {
   formattedValue: string;
   value: string;
};

export type City = {
   code: string;
   title: string;
};

export type Message = {
   percent: number;
   city: City;
   numbers: PhoneNumber[];
};

export type Found = Omit<Message, "percent">;
