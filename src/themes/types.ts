/**
 * Theme contract. A theme is design tokens plus a handful of named
 * treatments; every theme drives the SAME components and layout.
 * Adding a theme means adding one file to this folder, never
 * touching a component.
 */

export interface ThemeTokens {
  /** Page ground. */
  background: string;
  /** Cards and fields. */
  surface: string;
  /** Borders and rules. */
  border: string;
  /** Primary text. */
  ink: string;
  /** Secondary text. */
  muted: string;
  /** The one accent: marks, progress, highlights. */
  accent: string;
  /** Text on accent. */
  accentInk: string;
  /** Button fill (may differ from accent). */
  buttonBg: string;
  /** Text on buttons. */
  buttonInk: string;
}

export interface Theme {
  id: string;
  /** One line for humans and agents choosing a theme. */
  vibe: string;
  tokens: ThemeTokens;
  /** CSS font-family values, referencing the font vars in layout. */
  font: { display: string; body: string };
  display: {
    transform: 'none' | 'uppercase';
    weight: number;
    tracking: string;
    /** Line height for big display text. */
    leading: number;
  };
  /** Landing hero alignment. */
  heroAlign: 'center' | 'left';
  /** Small label above the headline. */
  eyebrow: 'rules' | 'chip' | 'plain';
  button: { radius: string; label: 'caps' | 'normal' };
  /** Step counter treatment on quiz screens. */
  numerals: 'serif' | 'ghost' | 'plain';
  /** Progress treatment. */
  progress: 'hairline' | 'meter' | 'slim';
  /** Answer option treatment. */
  options: 'line' | 'card';
  /** Result section treatment. */
  sections: 'rule' | 'panel' | 'soft';
  /** Landing proof block treatment. */
  proof: 'columns' | 'panel' | 'soft';
  /** Optional page atmosphere. */
  atmosphere: 'none' | 'glow';
  /**
   * Sales-page price treatment. 'boxed' is the centred price box;
   * 'editorial' is a left-set card beside the headline, display-font
   * price, hairline rows, the way an event page prices a seat.
   */
  price: 'boxed' | 'editorial';
}
