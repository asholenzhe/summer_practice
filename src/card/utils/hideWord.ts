function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export interface HideWordOptions {
  suffixes?: string[];
  irregularForms?: string[];
  mask?: string;
}

export function hideWord(text: string, wordToHide: string, opts: HideWordOptions = {}): string {
  if (!wordToHide) return text;

  const { suffixes = ['', 's', 'es', 'ed', 'ing'], irregularForms = [], mask = '____' } = opts;

  const base = escapeRegExp(wordToHide.toLowerCase());
  const forms = new Set<string>([
    ...suffixes.map((suf) => base + escapeRegExp(suf)),
    ...irregularForms.map((f) => escapeRegExp(f.toLowerCase())),
  ]);

  const pattern = new RegExp(`\\b(${Array.from(forms).join('|')})\\b([.,!?:;‘’“”'"]?)`, 'gi');

  return text.replace(pattern, (_, _wordMatch, punctuation) => {
    return mask + (punctuation || '');
  });
}
