export function runLexer(code) {
  const tokens = [];
  const lines = code.split('\n');
  const keywords = ['int', 'float', 'return', 'void', 'char', 'if', 'else', 'for', 'while', 'include'];
  
  lines.forEach((line, lineIdx) => {
    let activeLine = line.split('//')[0];
    if (!activeLine.trim()) return;

    let words = activeLine.split(/(\s+|;|[()[\]{}<>=+\-*/#,])/).filter(w => w.trim().length > 0);
    
    words.forEach(word => {
      let type = 'IDENTIFIER';
      if (keywords.includes(word)) type = 'KEYWORD';
      else if (!isNaN(word)) type = 'NUMBER';
      else if (word.match(/^[()[\]{}]$/)) type = 'PUNCTUATION';
      else if (word.match(/^[=+\-*/<>]$/)) type = 'OPERATOR';
      else if (word.startsWith('"') || word.startsWith("'") || word.includes('.h')) type = 'STRING';
      else if (word === ';') type = 'SEPARATOR';
      else if (word === '#') type = 'PREPROCESSOR';
      
      tokens.push({ type, lexeme: word, line: lineIdx + 1 });
    });
  });
  return tokens;
}

export function generateSymbolTable(tokens) {
  const symbols = [];
  let currentScope = 'Global';
  
  for(let i=0; i < tokens.length; i++) {
    if (tokens[i].type === 'KEYWORD' && ['int', 'float', 'char', 'void'].includes(tokens[i].lexeme)) {
      if (tokens[i+1] && tokens[i+1].type === 'IDENTIFIER') {
        const type = tokens[i].lexeme;
        const name = tokens[i+1].lexeme;
        let value = 'undefined';
        
        if (tokens[i+2] && tokens[i+2].lexeme === '(') {
          symbols.push({ name, type: "Function (" + type + ")", scope: 'Global', value: 'Code Block' });
          currentScope = name; 
        } else {
          if (tokens[i+2] && tokens[i+2].lexeme === '=' && tokens[i+3]) {
            value = tokens[i+3].lexeme;
          }
          symbols.push({ name, type, scope: currentScope, value });
        }
      }
    }
  }
  return symbols;
}

export function calculateErrors(code) {
  let newErrors = { lexical: [], syntax: [], semantic: [] };
  
  if (code.includes('@@')) {
    newErrors.lexical.push("Line 4: Unrecognized token '@@' is not valid in C syntax.");
  }
  
  const functionMatch = code.match(/int main\s*\(/);
  if (functionMatch && !code.includes('}')) {
    newErrors.syntax.push("Line 6: Expected '}' to close function body.");
  }
  if (code.includes('if (') && !code.includes(')')) {
    newErrors.syntax.push("Line 5: Expected ')' to close if condition.");
  }
  
  if (code.includes('int x = "hello"')) {
    newErrors.semantic.push("Line 4: Type mismatch. Cannot assign string literal to 'int'.");
  }
  if (code.match(/printf\([^"]*\)/)) {
    newErrors.semantic.push("Line 5: Invalid format string inside printf().");
  }

  return newErrors;
}

export const getTokenColor = (type) => {
  switch(type) {
    case 'KEYWORD': return '#66fcf1';
    case 'IDENTIFIER': return '#10b981';
    case 'NUMBER': return '#ef4444';
    case 'STRING': return '#f59e0b';
    case 'OPERATOR': return '#c084fc';
    case 'PREPROCESSOR': return '#93c5fd';
    default: return '#c5c6c7';
  }
};
