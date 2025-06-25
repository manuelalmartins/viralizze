// src/components/TagsInput.tsx
import React, { useState } from 'react';

interface TagsInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({ tags, onChange }) => {
  const [input, setInput] = useState('');

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      onChange([...tags, tag]);
      setInput('');
    }
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    onChange(newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input.trim());
    }
  };

  return (
    <div className="tags-input-container">
      {tags.map((tag, idx) => (
        <div key={idx} className="tag">
          {tag}
          <button type="button" onClick={() => removeTag(idx)}>×</button>
        </div>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Adicione hashtags e pressione Enter"
      />
    </div>
  );
};

export default TagsInput;
