export const lexemes = {
    init: new RegExp(/init\((.*?)\) ?{.*?}/, 'gs'),
    function: new RegExp(/func ([a-zA-Z][a-zA-Z0-9]*?)\(.*?\){.*?}/, 'gs'),
    switch: new RegExp(/switch .*?{.*?}/, 'gs'),
    struct: new RegExp(/(struct|class|extension) ([a-zA-Z][a-zA-Z0-9]*?):? .*?{/),
    variable: new RegExp(/(var|let) (.+?): (.+)/),
    identifier: new RegExp(/[a-zA-Z][a-zA-Z0-9]*/, 'g'),
    endBracket: new RegExp(/}/),
    enum: new RegExp(/enum ([a-zA-Z][a-zA-Z0-9]*?):? .*?{/),
    enumCase: new RegExp(/case ([a-zA-Z][a-zA-Z0-9]*)(\((.*?)\))?/),
    arraySpecialCaracters: new RegExp(/(<|>|\[|\])/g),
}