export default interface IUpdateClientDTO {
  client_id: string;
  name?: string;
  email?: string;
  old_password?: string;
  new_password?: string;
  telephone?: string;
}
