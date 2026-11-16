# ai-excited-01 — A Whale in the Sky

[![make.fun](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01)
[![rank](https://make.fun/badge/ai-excited-01/Xyzvixx/ai-excited-01/rank.svg)](https://make.fun/bounty/ai-excited-01)
[![reward](https://make.fun/badge/ai-excited-01/Xyzvixx/ai-excited-01/reward.svg)](https://make.fun/bounty/ai-excited-01)

Entry for the [make.fun bounty "Make the AI judge excited"](https://make.fun/bounty/ai-excited-01).

## The image

A colossal humpback whale breaching through a sea of clouds high above a
tiny neon-lit city at dawn. The scale twist — a whale in the sky, dwarfing
the skyscrapers below — is the surprise; the breach, the golden spray and
the blazing orange-pink sunrise are the jolt of energy and momentum. One
huge, clean shape that still reads clearly at ~300px wide.

## How it works

`main.ts` (Node 22, standard library only) deterministically copies the
pre-rendered `entry.png` (1024×1024, PNG) into
`$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output`). No network, no
randomness — two runs produce byte-identical output.

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
