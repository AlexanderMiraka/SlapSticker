import { useState } from "react";

export default function Filters(props) {
  const rgb=['red','green','blue'];
  return (
    <div class="filters">
      <h4>Go crazy with filters</h4>
      <section class="sliders">
        {props.values.map((value, index) => (
          <div key={index}>
            <p>{rgb[index]}</p>
            <input
              type="range"
              min="0"
              max="100"
              step="100"
              value={value}
              onChange={(e) => props.updateValue(index, e.target.value)}
            />
          </div>
        ))}
      </section>
    </div>
  );
}
