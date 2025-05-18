export interface IClientData {
  id?: number;
  name: string;
  email: string;
  job: string;
  rate: number;
  isactive: boolean;
}
export interface IModalForm {
  isOpen: boolean;
  onClose: () => void;
  mode: string;
  onSubmit: (data: IClientData) => void;
  clientData: IClientData | null;
}
