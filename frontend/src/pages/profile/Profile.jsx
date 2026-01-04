function Profile() {
  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        Hello, {localStorage.getItem("username")}
      </div>
      <div>
        <p
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          I Applogies to you, I don't build this profile page yet. Please give
          some time I build this page properly. 😊
        </p>
      </div>
    </>
  );
}

export default Profile;
