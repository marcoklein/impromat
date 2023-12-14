## DE

- Do not add original element name into markdown of the prompt (e.g. `# ${input.name}\n ${input.markdown}`),
- It's good to have a `description` field because with that the LLM can think.

`Tod in einer Minute`:

- Correct would be `Halbwertzeit` as a variation which is very hard to extract.

`Führender Körperteil`:

- Falsy extracts body parts as variations.

Better results with `Variante` instead of `Abwandlung`:

`Führungsübungen`:

- Many variations:
  - `Führen am Finger`
  - `Roboter`
  - `Laut geben`
  - `Geführte Kamera`
  - `Führungshand`
  - `Stockübung`
  - `Pilot`
