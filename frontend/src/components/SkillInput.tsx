import  { useState } from 'react';

export const SkillsInput = () => {
  const [skills, setSkills] = useState(['']);
  
  const handleSkillChange = (index:number, value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    if (skills.length < 10) {
      setSkills([...skills, '']);
    } else {
      alert('Only 10 skills are allowed');
    }
  };

  const removeSkill = (index:number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  return (
    <div>
      <label htmlFor="skills" className="label">Skills:</label>
      {skills.map((skill, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2 ">
          <input
            type="text"
            name="skills"
            className="input input-bordered w-full bg-zinc-700"
            value={skill}
            onChange={(e) => handleSkillChange(index, e.target.value)}
            placeholder={`Skill ${index + 1}`}
          />
          <button
            type="button"
            className="btn btn-error"
            onClick={() => removeSkill(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="btn btn-primary"
        onClick={addSkill}
      >
        Add Skill
      </button>
    </div>
  );
};

