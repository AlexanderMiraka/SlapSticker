
export default function PictureName(props) {

  return (
    <section class="homepageNamePhoto">
      <p>Name Your Photo</p>
      <input
        type="text"
        value={props.title}
        onChange={(ev) => props.passTitle(ev.target.value)}
      />
    </section>
  );
}
