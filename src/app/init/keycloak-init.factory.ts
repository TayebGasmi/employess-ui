import { KeycloakService } from "keycloak-angular";

export function initializeKeycloak(
  keycloak: KeycloakService
) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/auth' ,
        realm: 'skill',
        clientId: 'skill',
      },
      initOptions: {
        onLoad: 'login-required',
      }
      ,shouldUpdateToken: request =>
      {
        console.log('shouldUpdateToken', request);
        return true;
      }
    });
}
