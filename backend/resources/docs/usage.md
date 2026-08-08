# Halmazok kezelése

## Mire használható a program?

A program halmazelméleti feladatok megfogalmazására, kiértékelésére és szemléltetésére használható.

Segítségével halmazokat hozhatsz létre és módosíthatsz, megvizsgálhatod az elemeik és a halmazok közötti kapcsolatokat, valamint különböző halmazműveleteket végezhetsz.

A programmal többek között:

- egész számokat tartalmazó halmazokat hozhatsz létre,
- megvizsgálhatod, hogy egy elem szerepel-e egy halmazban,
- elemeket adhatsz hozzá halmazokhoz és távolíthatsz el belőlük,
- megvizsgálhatod két halmaz egyenlőségét,
- részhalmaz- és valódi részhalmaz-kapcsolatokat vizsgálhatsz,
- uniót, metszetet és különbséget képezhetsz,
- meghatározhatod egy halmaz komplementerét,
- feltételek alapján hozhatsz létre halmazokat,
- meghatározhatod egy halmaz elemszámát,
- halmazokat jeleníthetsz meg Venn-diagramon,
- pontokat és pontokat tartalmazó halmazokat kezelhetsz,
- pontokat jeleníthetsz meg koordinátarendszerben,
- több halmazműveletet tartalmazó összetett kifejezéseket értékelhetsz ki.

A program elsősorban **halmazelméleti fogalmak és műveletek gyakorlására, valamint ezek formális kifejezésére és szemléltetésére** szolgál.

> **Megjegyzés:** az alábbi példákban a pontokat használó példák kivételével a halmazok egész számokat tartalmaznak.

---

# 1. Első lépések

Egy halmaz létrehozásához add meg a halmaz nevét, majd az `:=` operátor után sorold fel az elemeit.

```text
A := {1,2,3}
```

Ezzel létrejön az `A` halmaz:

```text
{1,2,3}
```

Üres halmazt is létrehozhatsz:

```text
B := {}
```

Ezután a létrehozott halmazokkal különböző műveleteket végezhetsz.

Például hozz létre két halmazt:

```text
A := {1,2,3}
B := {2,3,4}
```

A két halmaz közös elemeinek meghatározásához használd a metszetet:

```text
A ∩ B
```

Eredmény:

```text
{2,3}
```

A program a kifejezés kiértékelésével közvetlenül megadja a művelet eredményét.

---

# 2. Egy elem vizsgálata

Ha azt szeretnéd megtudni, hogy egy adott elem szerepel-e egy halmazban, használd a `∈` operátort.

```text
A := {1,2,3}

2 ∈ A
```

Eredmény:

```text
igaz
```

Azt is megvizsgálhatod, hogy egy elem nem szerepel-e a halmazban:

```text
5 ∉ A
```

Eredmény:

```text
igaz
```

Az `∈` és `∉` operátorok használatával tehát közvetlenül megválaszolhatók az olyan kérdések, mint:

- „A 2 eleme az `A` halmaznak?”
- „Az 5 nem eleme az `A` halmaznak?”

---

# 3. Halmazok módosítása

A már létrehozott halmazokat később is módosíthatod.

## Elem hozzáadása

Az `.add()` utasítással elemet adhatsz egy halmazhoz:

```text
A := {1,2,3}

A.add(4)
```

Az `A` halmaz ezután:

```text
{1,2,3,4}
```

Ha olyan elemet adsz hozzá, amely már szerepel a halmazban, nem jön létre belőle új példány:

```text
A := {1,2,3}

A.add(2)
```

Az `A` továbbra is:

```text
{1,2,3}
```

Az `.add()` eredménye `igaz`, ha a hozzáadás sikeres volt, illetve akkor is, ha az elem már szerepelt a halmazban.

## Elem eltávolítása

A `.delete()` utasítással eltávolíthatsz egy elemet:

```text
A := {1,2,3}

A.delete(2)
```

Az `A` halmaz ezután:

```text
{1,3}
```

Ha a művelet sikeresen végrehajtásra került, akkor az eredmény `igaz` és ha az elem szerepelt a halmazban akkor törlésre kerül.

---

# 4. Halmazok egyenlőségének vizsgálata

Két halmaz akkor egyenlő, ha pontosan ugyanazokat az elemeket tartalmazza.

Az `=` operátorral vizsgálhatod a halmazok egyenlőségét.

```text
A := {1,2}
B := {1,2}
C := {2,3}
```

```text
A = B
```

Eredmény:

```text
igaz
```

Míg:

```text
A = C
```

eredménye:

```text
hamis
```

A halmazok sorrendje nem számít: az a fontos, hogy ugyanazokat az elemeket tartalmazzák.

---

# 5. Részhalmazok vizsgálata

Megvizsgálhatod azt is, hogy egy halmaz minden eleme megtalálható-e egy másik halmazban.

Ehhez a `⊆` operátort használhatod.

```text
A := {1,2}
B := {1,2,3}

A ⊆ B
```

Eredmény:

```text
igaz
```

Az `A` minden eleme megtalálható `B`-ben, ezért `A` részhalmaza `B`-nek.

## Valódi részhalmaz

A `⊂` operátorral valódi részhalmazt vizsgálhatsz:

```text
A := {1,2}
B := {1,2,3}

A ⊂ B
```

Eredmény:

```text
igaz
```

Ha azonban a két halmaz egyenlő:

```text
A := {1,2}
B := {1,2}

A ⊂ B
```

az eredmény:

```text
hamis
```

Egy halmaz önmagának részhalmaza, de **nem valódi részhalmaza**.

---

# 6. Halmazok uniója

Ha két vagy több halmaz összes különböző elemét szeretnéd megkapni, használd az unió (`∪`) műveletet.

```text
A := {1,2,3}
B := {3,4,5}

A ∪ B
```

Eredmény:

```text
{1,2,3,4,5}
```

A közös elemek csak egyszer szerepelnek az eredményben.

Több halmaz unióját is megadhatod egyetlen kifejezésben:

```text
A ∪ B ∪ C ∪ D
```

---

# 7. Halmazok metszete

A metszet (`∩`) azokból az elemekből áll, amelyek mindkét vizsgált halmazban megtalálhatók.

```text
A := {1,2,3}
B := {2,3,4}

A ∩ B
```

Eredmény:

```text
{2,3}
```

Ha a két halmaznak nincs közös eleme:

```text
A := {1,2}
B := {3,4}

A ∩ B
```

eredménye:

```text
{}
```

Több halmaz közös elemei is meghatározhatók:

```text
A ∩ B ∩ C
```

---

# 8. Halmazok különbsége

A `∖` operátorral meghatározhatod az első halmaz azon elemeit, amelyek a másodikban nem szerepelnek.

```text
A := {1,2,3}
B := {2,3,4}

A ∖ B
```

Eredmény:

```text
{1}
```

A művelet sorrendje számít:

```text
B ∖ A
```

eredménye:

```text
{4}
```

Ezért:

```text
A ∖ B
```

és

```text
B ∖ A
```

általában nem ugyanazt az eredményt adja.

---

# 9. Komplementer halmaz

Egy halmaz komplementerének meghatározásához szükség van egy univerzumként használt halmazra.

Legyen:

```text
H := {0,1,2,3,4,5}
A := {1,2}
```

Az `A` komplementere:

```text
A∁
```

Eredmény:

```text
{0,3,4,5}
```

A teljes univerzum komplementere az üres halmaz:

```text
H∁
```

Eredmény:

```text
{}
```

A komplementer tehát az univerzum azon elemeit tartalmazza, amelyek a vizsgált halmazban nem szerepelnek.

---

# 10. Halmaz létrehozása feltétel alapján

A halmazokat nem szükséges mindig egyesével felsorolt elemekkel létrehozni.

Lehetőséged van egy feltételt is megadni, amely alapján a program meghatározza a halmaz elemeit.

Például:

```text
C := {x | x > 1 ∧ x <= 3}
```

Eredmény:

```text
{2,3}
```

A fenti kifejezés minden olyan egész számot kiválaszt, amely nagyobb `1`-nél és legfeljebb `3`.

Összetettebb feltételek is megadhatók:

```text
F := {i | i >= 0 ∧ i <= 20 ∧ (5 | i ∨ 7 | i) ∧ 10 ∤ i}
```

Eredmény:

```text
{0,5,7,14,15}
```

A feltételek logikai operátorokkal kombinálhatók, így összetettebb matematikai szabályok alapján is létrehozhatsz halmazokat.

---

# 11. Venn-diagram

A halmazok közötti kapcsolatot vizuálisan is megjelenítheted.

Ehhez a `Venn()` utasítást használhatod.

```text
A := {2,4,5}
B := {1,2,3}

Venn(A,B)
```

A diagramon láthatóvá válik, hogy mely elemek tartoznak csak az egyik, illetve mindkét halmazhoz.

A Venn-diagram különösen hasznos lehet halmazok kapcsolatának szemléltetésére és halmazelméleti feladatok ellenőrzésére.

---

# 12. Halmaz elemszáma

A `|A|` jelöléssel meghatározhatod egy halmaz elemszámát.

```text
H := {0,1,2,3,4,5}
C := {2,3}
```

```text
|H|
```

Eredmény:

```text
6
```

Másik példa:

```text
|C|
```

Eredmény:

```text
2
```

Az elemszám összetett kifejezésre is alkalmazható:

```text
|A ∪ B|
```

vagy:

```text
|A ∩ B|
```

Így nemcsak egy már létrehozott halmaz elemszáma, hanem egy halmazművelet eredményének elemszáma is meghatározható.

---

# 13. Pontok és pontokat tartalmazó halmazok

A program az egész számokat tartalmazó halmazok mellett kétdimenziós pontok kezelését is támogatja.

Egy pontot két koordinátával adhatsz meg:

```text
[3,-4]
```

Pontokat tartalmazó halmaz például:

```text
A := {[3,-4],[5,-6]}
```

Pontokat külön változóként is létrehozhatsz:

```text
C := [1,2]
D := [-2,-8]
```

Ezekből később pontokat tartalmazó halmaz készíthető:

```text
B := {C,D}
```

Eredmény:

```text
{[1,2],[-2,-8]}
```

A pontok így a halmazokhoz hasonlóan változókban tárolhatók és felhasználhatók további műveletekben.

---

# 14. Pontok megjelenítése

A pontokat koordinátarendszerben is megjelenítheted a `PointSetDiagram()` utasítással.

Például:

```text
A := {[3,-4],[5,-6]}

PointSetDiagram(A)
```

Közvetlenül megadott pontokat is megjeleníthetsz:

```text
PointSetDiagram({[3,5],[-7,-8]})
```

Ez lehetőséget ad a pontokat tartalmazó halmazok vizuális szemléltetésére.

---

# 15. Összetett halmazkifejezések

A programban az egyes műveletek kombinálhatók, ezért nem szükséges minden köztes eredményt külön változóban tárolni.

Például:

```text
A ∪ B ∪ C
```

vagy:

```text
A ∩ B ∩ C
```

Komplementerrel is kombinálhatod a halmazműveleteket:

```text
(A ∪ B)∁
```

Az eredmény elemszáma is meghatározható:

```text
|(A ∪ B)∁|
```

A zárójelek segítségével meghatározhatod, hogy egy összetett kifejezés mely részét szeretnéd először kiértékelni.

## Matematikai azonosságok kifejezése

A támogatott műveletek kombinálhatósága miatt matematikai halmazelméleti azonosságok is megfogalmazhatók.

Például a De Morgan-azonosság:

```text
(A ∩ C)∁ = A∁ ∪ C∁
```

Eredmény:

```text
igaz
```

vagy:

```text
(A ∪ C)∁ = A∁ ∩ C∁
```

Eredmény:

```text
igaz
```

Hasonló módon összetett matematikai formulák – például a logikai szita formulái – is kifejezhetők a támogatott műveletek segítségével.

---

# 16. Támogatott operátorok

Az alábbi táblázat gyors referencia azok számára, akik már ismerik a program alapvető használatát.

## Halmazműveletek

| Operátor | Jelentés |
|---|---|
| `∈` | eleme |
| `∉` | nem eleme |
| `=` | egyenlő |
| `⊆` | részhalmaza |
| `⊂` | valódi részhalmaza |
| `∪` | unió |
| `∩` | metszet |
| `∖` | különbség |
| `∁` | komplementer |
| `\|A\|` | `A` elemszáma |

## Összehasonlító és logikai operátorok

| Operátor | Jelentés |
|---|---|
| `>` | nagyobb |
| `<` | kisebb |
| `>=` | nagyobb vagy egyenlő |
| `<=` | kisebb vagy egyenlő |
| `=` | egyenlő |
| `∧` | logikai és |
| `∨` | logikai vagy |
| `\|` | osztható |
| `∤` | nem osztható |

## Egyéb jelölések

| Jelölés | Jelentés |
|---|---|
| `:=` | értékadás |
| `{}` | üres halmaz |
| `{...}` | halmaz |
| `{x \| feltétel}` | feltétel alapján létrehozott halmaz |
| `[x,y]` | kétdimenziós pont |

---

# 17. Támogatott utasítások

A kifejezések mellett néhány utasítás közvetlenül a halmazok vagy pontok módosítására, illetve megjelenítésére szolgál.

| Utasítás | Funkció |
|---|---|
| `A.add(x)` | `x` hozzáadása az `A` halmazhoz |
| `A.delete(x)` | `x` eltávolítása az `A` halmazból |
| `Venn(A,B)` | halmazok Venn-diagramjának megjelenítése |
| `PointSetDiagram(...)` | pontokat tartalmazó halmaz megjelenítése |

---

# Összefoglalás

A program segítségével a halmazelmélet alapvető fogalmai és műveletei közvetlenül, matematikai jelölésekhez hasonló formában adhatók meg.

A használat tipikus menete például:

```text
A := {1,2,3}
B := {2,3,4}

A ∪ B
A ∩ B
A ∖ B
```

Ezekkel létrehozhatod a halmazokat, majd különböző szempontok szerint vizsgálhatod és alakíthatod őket.

Az egyszerű műveletek mellett feltétel alapján is létrehozhatsz halmazokat:

```text
C := {x | x > 1 ∧ x <= 3}
```

Az eredményeket vizuálisan is megjelenítheted:

```text
Venn(A,B)
```

illetve pontokat tartalmazó halmazok esetén:

```text
PointSetDiagram(A)
```

A támogatott műveletek kombinálhatók, ezért összetett halmazelméleti kifejezések és matematikai formulák is megadhatók.