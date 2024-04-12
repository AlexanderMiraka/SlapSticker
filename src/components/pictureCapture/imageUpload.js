import React, { useEffect, useState } from "react";
export default function ImageUpload(props) {
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        id="customSticker"
        onChange={props.customSticker}
      />
      <label for="customSticker" class="buttonTertiary">
        Upload
      </label>
    </div>
  );
}
