import { Box, Button, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';

export interface PromptSelectorProps {
  children: (prompt: string) => React.ReactNode;
}

export const PromptSelector = ({ children }: PromptSelectorProps) => {
  const [text, setText] = useState('Programming languages by popularity');
  const [prompt, setPrompt] = useState(text);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPrompt(text);
  }

  return (
    <>
      {children(prompt)} 
      <form onSubmit={onSubmit} style={{ width: '100%' }}>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 2 }}>
          <TextField
            fullWidth
            id="prompt-selector-input"
            value={text}
            onChange={e => {
              setText(e.target.value);
            }}
          />
          <Button type="submit">
            <SendIcon/>
          </Button>
        </Box>
      </form>
    </>
  );
};
