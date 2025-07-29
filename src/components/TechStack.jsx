import React from 'react';

const TechStack = () => {
  const technologies = ['React', 'TypeScript', 'Tauri', 'Rust', 'Tailwind CSS'];

  return (
    <div className="tech-stack mb-8">
      <h3 className="text-2xl font-semibold mb-4 text-teal-400">
        🛠️ Built With
      </h3>
      <div className="flex gap-4 flex-wrap justify-center">
        {technologies.map((tech, index) => (
          <span key={index} className="tech-item">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechStack; 