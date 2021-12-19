### Decoupage d une sequence

Paquet mere:

- `3` bits: `version`
- `3` bits: `type ID`.
  - type id represente le type de la data qui suit (ex: `4` = `literal value`)

## Types

- `4` = `literal value` => encode a simple binary number
  - bites length must represent a multiple of 4
  - every group of 4 bits is prefixed by `1` or `0`.
  - If `1` -> keep going there are other for bits after
  - if `0` -> last 4 bits
- Every other TYPE ID is an `operator`

## Example: 4

Hexa: `D2FE28`

Becomes:

```
110100101111111000101000
```

etape 1: On decoupe en `4`

```
0111 1110 0101 000
```

etape 2: On ajoute les prefix `1` et `0`

```
10111 11110 10101 0000
```

```
110 100 10111 11110 00101 000
VVV TTT AAAAA BBBBB CCCCC
```

- version: `110` -> `6`
- type id: `100` -> `4`
- A: 4 bits: `10111` => `1` & `0111`
  - `1` means not done
  - `0111` represent `7`
- B: 4 bits: `11110` => `1` & `1110`
  - `1` means not done
  - `1110` represent `14`
- C: 4 bits: `00101` => `0` & `0101`
  - `0` means LAST 4 bits
  - `0101` represent `5`
- `000` -> IGNORE

Binary representation = `011111100101` -> `2021`

## length type ID

- between type id and data
- if `0` -> 15 next bits represent total length in bits of the bits inside that
  maion package
- if `1` -> 11 next bits represent the number of sub packets

### Example

```
001 110 0 000000000011011 110 100 0 1010 010 100 1 0001 0 0100 0000000
VVV TTT I LLLLLLLLLLLLLLL AAA AAA A AAAA BBB BBB B BBBB B BBBB
```

- version: `1`
- type: `6` -> OPERATOR
- length resolver: `0` -> 15 next bits are the TOTAL length of the
  sub-packet**s**
- length `000000000011011` -> `27`

### Example 2

```
111 011 1 00000000011 
- pck 1: 010 100 0 0001 
- pck 2: 100 100 0 0010 

001 100 0 0011 00000
```

- version: `7`
- type ID: `3`
- length resolver: `1`
- Number of sub packets: `00000000011` => `3`

Packet 1:

- version: `2`
- type id: `4`
- prefix: `0` -> last package
- data: `1`

Packet 2:

- version: `4`
- type id: `4`
- prefix: `0`
- data: `2`

packet 3:

- version: `1`
- type id: `4`
- prefix: `0`
- data: `3`

Ignored bits: `00000`
