# Physical IoT-Dashboard

This project contains the code for the microcontrollers (proxies) and the Raspberry Pi.

---

## Physical Board Setup

This part describes the structure and pin assignment of the physical iot dashbaord.

### Order of the individual boards

The individual boards (8x8, white) are placed on a large plate of wood in the arrangement 4x4. So there are 16 boards in total.
The boards are then connected together to form a continuous chain. In this case, they were connected as follows.

__IoT-Dashboard tile order:__  

[[1, 2, 3, 4],  
[ 8, 7, 6, 5],  
[ 9,10,11,12],  
[16,15,14,13]]

### Sensor PINs

|     |      |
| --- | ---- |
| GND | 5V   |
| SCL | SDA  |
| Row | Col  |
| -   | Tile |

### Tile In

|      |     |
| ---- | --- |
| SDA  | SCL |
| 5V   | GND |
| Tile | -   |

### Tile Out

|     |      |
| --- | ---- |
| -   | Tile |
| GND | 5V   |
| SCL | SDA  |

---

## AWS DynamoDB Cloud connection

To connect the dashboard to the AWS DynamoDB, you must first create a user in AWS IAM. It is best to give the user limited rights, so that he can only see the device table and also only has read rights.
Once this is done, the user must be installed on the dashboard so that it can be accessed.

This can be configurated with aws cli, use `aws config --profil <profil_name>` and enter your IAM user.
The configuration is safed under `~/.aws/credentials`.
