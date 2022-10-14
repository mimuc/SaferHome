# iot-dashboard

## ESLint Config

- ✔ How would you like to use ESLint? · style
- ✔ What type of modules does your project use? · esm
- ✔ Which framework does your project use? · react
- ✔ Does your project use TypeScript? · No
- ✔ Where does your code run? · browser✔ How would you like to define a style for your project? · guide
- ✔ Which style guide do you want to follow? · google
- ✔ What format do you want your config file to be in? · JSON

## Amplify config

- `amplify init`
- create a user with Amplify Admin Access
- use amplify configurations in this project to create the backend

## Configuration

Users can be managed in the Amplify Backend Console.
The following __groups__ were created here for the study.

- `admin` - has access to everything in the web UI
- `device` - contains all participants for the device list group
- `dashboard` - contains all participants for the dashboard group
- `household_A` - `A` can be replaced with any other letter or number to differentiat between the different households

## Device

One household can create as many device as needed. Each member of the household
can see all devices. Each member can rate each device seperate from the other
members.

### SlotType

- WALL
- FLOOR
- SENSOR

### Category Type

- VOICEASSISTENT
- TEMPERATURESENSOR
- OTHER
- LIGHTSENSOR

### Security and Privacy Level

| code | modi      |
| ---- | --------- |
| 0    | analysing |
| 1    | red       |
| 2    | yellow    |
| 3    | green     |