<template>
    <UiCalcPage title="CSV to JSON Converter" category="tools" description-title="Turn spreadsheet data into JSON — privately">
        <template #calc>
            <CalculatorsToolsCsvToJsonCalc />
        </template>
        <template #facts>
            <CalcFact label="Privacy" value="Never uploaded" />
            <CalcFact label="Quoted fields" value="RFC 4180" />
            <CalcFact label="Delimiters" value="Comma / ; / tab" />
        </template>
        <template #description>
            <p>
                This <strong>CSV to JSON Converter</strong> turns comma-separated data — exports from Excel, Google Sheets, databases, CRMs — into a JSON array of objects, using the first row as keys. It handles the tricky parts properly: <strong>quoted fields containing commas, escaped quotes, and line breaks inside cells</strong> (RFC 4180), which naive split-by-comma converters get wrong.
            </p>
            <p>
                Pick the delimiter (<strong>comma, semicolon, or tab</strong> — European Excel exports often use semicolons), and optionally auto-convert numeric strings to real numbers and true/false to booleans, so the JSON is ready for your API or script without post-processing.
            </p>
            <p>
                As always: the conversion runs <strong>entirely in your browser</strong>. Customer lists and financial exports never leave your device — paste, convert, copy. Need to clean up the result? Our <NuxtLink to="/tools/json-formatter">JSON formatter</NuxtLink> validates and re-indents it.
            </p>
        </template>
        <template #example>
            <p>
                Input CSV:
            </p>
            <p>
                <code>name,age,city<br>Maria,29,Athens<br>"Nikos, Jr.",34,Patras</code>
            </p>
            <p>
                Output: <code>[{"name":"Maria","age":29,"city":"Athens"},{"name":"Nikos, Jr.","age":34,"city":"Patras"}]</code> — note the quoted comma in "Nikos, Jr." survives intact, and ages became numbers.
            </p>
        </template>
        <template #faq>
            <CalcFaq :faqs="faqs" />
        </template>
    </UiCalcPage>
</template>

<script setup>
definePageMeta({ layout: 'brutalist' })

const faqs = [
    { q: "How do I convert a CSV file to JSON?", a: "Open the CSV in any text editor (or the spreadsheet itself), copy the contents, paste above, and click Convert. The first row becomes the JSON keys and each following row becomes an object. Copy the result with one click." },
    { q: "How do I convert an Excel or Google Sheets file to JSON?", a: "Export it first: File → Save As → CSV in Excel, or File → Download → Comma Separated Values in Sheets. Then paste the CSV here. Note that Excel in many European locales exports with semicolons instead of commas — select the Semicolon delimiter if columns aren't splitting." },
    { q: "Why are all my columns ending up in one field?", a: "Wrong delimiter. European Excel versions export 'CSV' with semicolons (because the comma is the decimal separator), and some exports use tabs. Switch the delimiter button to Semicolon or Tab and convert again." },
    { q: "Does this handle commas inside values?", a: "Yes — fields wrapped in double quotes are parsed per RFC 4180, so \"Athens, Greece\" stays one value, embedded \"\" become literal quotes, and even line breaks inside quoted cells survive. This is exactly what naive converters that just split on commas get wrong." },
    { q: "Is it safe to paste customer data into this converter?", a: "Yes — parsing and conversion run entirely in your browser; nothing is transmitted or stored anywhere. That's the point: CSV exports are usually full of names, emails and financials that shouldn't be uploaded to a random converter site." },
    { q: "What JSON structure does the converter produce?", a: "An array of flat objects — one per data row, keyed by the header row: [{\"name\":\"Maria\",\"age\":29}, …]. That's the format REST APIs, JavaScript code, and most import tools expect. Nested JSON requires custom mapping logic beyond what CSV can express." },
    { q: "What does the 'Parse numbers' option do?", a: "It converts values that look like numbers into JSON numbers (29 instead of \"29\"), and true/false/null into their JSON types. Turn it off if you have values like ZIP codes or phone numbers where leading zeros matter — 08015 would otherwise become 8015." },
    { q: "What happens with empty cells and missing columns?", a: "Empty cells become empty strings (\"\"). Rows shorter than the header get empty strings for the missing columns; extra cells beyond the header are dropped. Blank header cells get automatic names (column_3)." },
    { q: "How do I convert JSON back to CSV?", a: "The reverse needs flattening decisions (what to do with nested objects and arrays), so it's a different tool. For flat JSON arrays, spreadsheet formulas or a short script (e.g. Python pandas: pd.read_json(...).to_csv()) handle it. Tell us if you'd use a JSON-to-CSV tool here — it's a natural companion." },
    { q: "Is there a size limit?", a: "Thousands of rows convert instantly; everything happens in memory in your browser. Extremely large exports (hundreds of thousands of rows) may slow the tab — for those, a command-line tool or script is the better fit." },
    { q: "Why does my CSV have weird characters like â€™ or Î± after converting?", a: "An encoding mismatch — the file was saved in UTF-8 but read as Windows-1252 (or vice versa) before you pasted it. Re-open the CSV in a text editor, save it as UTF-8, and copy again. The converter itself is fully Unicode-safe." },
    { q: "What is the difference between CSV and JSON?", a: "CSV is tabular: rows and columns, no types, no nesting — perfect for spreadsheets. JSON is structured: typed values, nesting, arrays — the language of APIs. Converting CSV→JSON adds keys and types to raw rows so software can consume the data reliably." },
]

useCalcSEO(
    "CSV to JSON Converter — Free & Private",
    "Convert CSV to a JSON array of objects in your browser. Handles quoted fields, semicolon and tab delimiters, and number parsing. Data never leaves your device.",
    faqs
)

useHead({
    script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Convert CSV to JSON',
            description: 'Turn spreadsheet/CSV data into a JSON array of objects.',
            step: [
                { '@type': 'HowToStep', position: 1, name: 'Paste your CSV', text: 'Copy the data from your file or spreadsheet, headers included, and paste it in.' },
                { '@type': 'HowToStep', position: 2, name: 'Set delimiter and options', text: 'Choose comma, semicolon, or tab, and whether numeric strings should become real numbers.' },
                { '@type': 'HowToStep', position: 3, name: 'Convert and copy', text: 'Click Convert — each row becomes a JSON object keyed by the header row. Copy the JSON with one click.' },
            ],
        }),
    }],
})
</script>
