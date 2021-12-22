# cra-template-thiel

This template serves to start a project with [crate-react-app](https://create-react-app.dev/), serving as a basis for complex creations using a kit of already configured libs.

## How to use

to start using this template pass the `--template thiel` tag when writing the project build command.

```sh
npx create-react-app batata-app --template thiel
```

or

```sh
yarn create react-app batata-app --template thiel
```

## Main installed libs

As this project was developed based on [cra-template-typescript](https://www.npmjs.com/package/cra-template-typescript), it already comes with typescript enabled by default.

- [Ant Design](https://github.com/ant-design/ant-design): React UI lib that contains a set of components for building interfaces.
- [Axios](https://github.com/axios/axios): HTTP request lib based on `promises` for browser and node.js.
- [React Router Context](https://www.npmjs.com/package/react-router-context): It is a library based on react-router-dom, which uses React's Context API for route state management and route access permission customization.

## Folder structure

- generator
- public
- src
  - assets
    - images
    - styles
  - components
  - modules
    - contexts
    - hooks
    - routing
    - service
  - pages

## Routes manager

For route management, the `react-router-context` library was used to facilitate the creation of routes and because it already brings the functionality of access permission to routes, with hooks for viewing the route tree and managing the access role.

The route management file is located in the `src/modules/routing/index.jsx` folder

```ts
import { ReactRouterContext } from 'react-router-context';
import { Layout } from 'components';
import { HomePage, LoginPage, PrivatePage } from 'pages';

function Routing() {
  return (
    <ReactRouterContext
      routes={[
        {
          path: 'private',
          element: <Layout.Private pageComponent={PrivatePage} />,
          roles: [],
          params: { title: 'Private' },
        },
        {
          path: 'login',
          element: <Layout.Public pageComponent={LoginPage} />,
          roles: [],
          params: { title: 'Login' },
        },
        {
          path: '/',
          element: <Layout.Public pageComponent={HomePage} />,
          roles: [],
          params: { title: 'Home' },
        },
      ]}
    />
  );
}

export default Routing;
```

to learn more about lib, [visit the full documentation](https://www.npmjs.com/package/react-router-context)

## Requisition services

Services were created based on classes, to facilitate the use and sharing of methods, using the [axios](https://github.com/axios/axios) lib to manage request traffic.

Services are located in the `src/modules/services` folder.

Below is an example of service applied to authentication request

```ts
import ServiceBase from 'modules/services/ServiceBase';
import AuthStorage from './authStorage';
import { AuthServiceAccessProps, AuthServiceAccessResponse } from './types';

export default class AuthService extends ServiceBase {
  baseUrl = '/auth';
  authStorage: AuthStorage;

  constructor() {
    super();

    this.authStorage = new AuthStorage();
  }

  public async access(data: AuthServiceAccessProps) {
    return this.service
      .post<AuthServiceAccessResponse>(`${this.baseUrl}/access`, data)
      .then((response) => {
        const { accessToken, user } = response.data;

        this.setHeaderAuthorization(accessToken);
        this.authStorage.setAccessToken(accessToken);
        this.authStorage.setCurrentUser(user);

        return response;
      });
  }
}
```

Service call example

```ts
...

const authService = new AuthService();

async function onSubmit(values: FormValues) {
  try {
    const { data } = await authService.access(values);

    setRole(data.user.role);
    navigate('/private');
  } catch {
    message.error('Unable to authenticate!');
  }
}

...
```

## Generator

Generator is a file creator based on [Plop](https://github.com/plopjs/plop) lib, it is responsible for creating the "components" necessary for the application, thus maintaining the pattern.

### how to use it

At the root of the project run the command

```sh
yarn generator
```

Or

```sh
npm generator
```

A list of options will appear, you can choose what you need and configure your creation.

**Possible creations:**

- component
- context
- hook
- page
- service

> Note: When creating a **page** without a parent, the generator must create a custom route in the routing file.

## know more

For more information on the **Create React App**, see:

- [Getting Started](https://create-react-app.dev/docs/getting-started) – How to create a new project.
- [User Guide](https://create-react-app.dev) – How to develop projects started with Create React App.
