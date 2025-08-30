import { useEffect, useMemo, useState } from 'react';
import { api } from './api';
import './App.css';

function Field({ label, ...rest }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input {...rest} />
    </label>
  );
}

function Card({ title, children, actions }) {
  return (
    <div className="card">
      {title ? <h3>{title}</h3> : null}
      <div className="card-body">{children}</div>
      {actions ? <div className="card-actions">{actions}</div> : null}
    </div>
  );
}

export default function AppUI() {
  const [tab, setTab] = useState('user');

  const [userForm, setUserForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [userLogin, setUserLogin] = useState({ email: '', password: '' });
  const [adminForm, setAdminForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [adminLogin, setAdminLogin] = useState({ email: '', password: '' });

  const [courseForm, setCourseForm] = useState({ title: '', description: '', imageUrl: '', price: '' });
  const [updateForm, setUpdateForm] = useState({ courseId: '', title: '', description: '', imageUrl: '', price: '' });
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');

  const userToken = useMemo(() => localStorage.getItem('userToken') || '', []);
  const adminToken = useMemo(() => localStorage.getItem('adminToken') || '', []);
  const [userTokenState, setUserTokenState] = useState(userToken);
  const [adminTokenState, setAdminTokenState] = useState(adminToken);

  useEffect(() => {
    if (tab === 'courses') {
      handleListCourses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  async function handleUserSignup(e) {
    e.preventDefault();
    const res = await api.userSignup(userForm);
    alert(res.message || 'Signup success');
  }

  async function handleUserSignin(e) {
    e.preventDefault();
    const res = await api.userSignin(userLogin);
    if (res?.token) {
      localStorage.setItem('userToken', res.token);
      setUserTokenState(res.token);
    }
    alert(res.message || 'Signin success');
  }

  function clearUserToken() {
    localStorage.removeItem('userToken');
    setUserTokenState('');
  }

  async function copyUserToken() {
    if (!userTokenState) return;
    try {
      await navigator.clipboard.writeText(userTokenState);
      alert('User token copied');
    } catch (_) {
      // no-op
    }
  }

  async function handleAdminSignup(e) {
    e.preventDefault();
    const res = await api.adminSignup(adminForm);
    alert(res.message || 'Signup success');
  }

  async function handleAdminSignin(e) {
    e.preventDefault();
    const res = await api.adminSignin(adminLogin);
    if (res?.token) {
      localStorage.setItem('adminToken', res.token);
      setAdminTokenState(res.token);
    }
    alert(res.message || 'Signin success');
  }

  function clearAdminToken() {
    localStorage.removeItem('adminToken');
    setAdminTokenState('');
  }
  async function copyAdminToken() {
    if (!adminTokenState) return;
    try {
      await navigator.clipboard.writeText(adminTokenState);
      alert('Admin token copied');
    } catch (_) {
      // no-op
    }
  }

  async function handleCreateCourse(e) {
    e.preventDefault();
    const payload = { ...courseForm, price: Number(courseForm.price) || 0 };
    const res = await api.createCourse(payload);
    alert(res.message || 'Course created');
    await handleListCourses();
  }

  async function handleUpdateCourse(e) {
    e.preventDefault();
    const payload = { ...updateForm, price: Number(updateForm.price) || 0 };
    const res = await api.updateCourse(payload);
    alert(res.message || 'Course updated');
    await handleListCourses();
  }

  async function handleListCourses() {
    try {
      const res = await api.listMyCourses();
      setCourses(res.courses || []);
    } catch (e) {
      console.error(e);
      setCourses([]);
    }
  }

  const filteredCourses = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter(c => (
      (c.title || '').toLowerCase().includes(q) ||
      (c.description || '').toLowerCase().includes(q)
    ));
  }, [courses, search]);

  function prefillUpdate(course) {
    setUpdateForm({
      courseId: course._id || '',
      title: course.title || '',
      description: course.description || '',
      imageUrl: course.imageURL || '',
      price: String(course.price ?? ''),
    });
    setTab('courses');
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Course Selling App</h1>
        <nav className="tabs">
          <button className={tab === 'user' ? 'active' : ''} onClick={() => setTab('user')}>User</button>
          <button className={tab === 'admin' ? 'active' : ''} onClick={() => setTab('admin')}>Admin</button>
          <button className={tab === 'courses' ? 'active' : ''} onClick={() => setTab('courses')}>Courses</button>
        </nav>
      </header>

      {tab === 'user' && (
        <section>
          <div className="hero">
            <h2>Welcome Learner 👋</h2>
            <p>Create your account or sign in to start purchasing and learning courses.</p>
          </div>
          <div className="grid">
            <form className="card" onSubmit={handleUserSignup}>
              <h3>User Signup</h3>
              <Field label="First name" value={userForm.firstName} onChange={(e) => setUserForm(v => ({ ...v, firstName: e.target.value }))} required />
              <Field label="Last name" value={userForm.lastName} onChange={(e) => setUserForm(v => ({ ...v, lastName: e.target.value }))} required />
              <Field label="Email" type="email" value={userForm.email} onChange={(e) => setUserForm(v => ({ ...v, email: e.target.value }))} required />
              <Field label="Password" type="password" value={userForm.password} onChange={(e) => setUserForm(v => ({ ...v, password: e.target.value }))} required />
              <div className="card-actions"><button className="btn btn-primary" type="submit">Sign up</button></div>
            </form>

            <form className="card" onSubmit={handleUserSignin}>
              <h3>User Signin</h3>
              <Field label="Email" type="email" value={userLogin.email} onChange={(e) => setUserLogin(v => ({ ...v, email: e.target.value }))} required />
              <Field label="Password" type="password" value={userLogin.password} onChange={(e) => setUserLogin(v => ({ ...v, password: e.target.value }))} required />
              <div className="card-actions"><button className="btn btn-primary" type="submit">Sign in</button></div>
            </form>

            <Card
              title="User Token"
              actions={
                <>
                  <button className="btn" type="button" onClick={copyUserToken}>Copy</button>
                  <button className="btn btn-secondary" type="button" onClick={clearUserToken}>Clear</button>
                </>
              }
            >
              <pre className="token-box">{userTokenState || 'No token'}</pre>
            </Card>
          </div>
        </section>
      )}

      {tab === 'admin' && (
        <section>
          <div className="hero">
            <h2>Admin Console 🔧</h2>
            <p>Manage your account and authenticate to create, update, and list your courses.</p>
          </div>
          <div className="grid">
            <form className="card" onSubmit={handleAdminSignup}>
              <h3>Admin Signup</h3>
              <Field label="First name" value={adminForm.firstName} onChange={(e) => setAdminForm(v => ({ ...v, firstName: e.target.value }))} required />
              <Field label="Last name" value={adminForm.lastName} onChange={(e) => setAdminForm(v => ({ ...v, lastName: e.target.value }))} required />
              <Field label="Email" type="email" value={adminForm.email} onChange={(e) => setAdminForm(v => ({ ...v, email: e.target.value }))} required />
              <Field label="Password" type="password" value={adminForm.password} onChange={(e) => setAdminForm(v => ({ ...v, password: e.target.value }))} required />
              <div className="card-actions"><button className="btn btn-primary" type="submit">Sign up</button></div>
            </form>

            <form className="card" onSubmit={handleAdminSignin}>
              <h3>Admin Signin</h3>
              <Field label="Email" type="email" value={adminLogin.email} onChange={(e) => setAdminLogin(v => ({ ...v, email: e.target.value }))} required />
              <Field label="Password" type="password" value={adminLogin.password} onChange={(e) => setAdminLogin(v => ({ ...v, password: e.target.value }))} required />
              <div className="card-actions"><button className="btn btn-primary" type="submit">Sign in</button></div>
            </form>

            <Card
              title="Admin Token"
              actions={
                <>
                  <button className="btn" type="button" onClick={copyAdminToken}>Copy</button>
                  <button className="btn btn-secondary" type="button" onClick={clearAdminToken}>Clear</button>
                </>
              }
            >
              <pre className="token-box">{adminTokenState || 'No token'}</pre>
            </Card>
          </div>
        </section>
      )}

      {tab === 'courses' && (
        <section>
          <div className="hero">
            <h2>Your Courses 🎓</h2>
            <p>Create, update, and browse all courses you own. Click a card to prefill the update form.</p>
          </div>
          <div className="grid">
            <form className="card" onSubmit={handleCreateCourse}>
              <h3>Create Course</h3>
              <Field label="Title" value={courseForm.title} onChange={(e) => setCourseForm(v => ({ ...v, title: e.target.value }))} required />
              <Field label="Description" value={courseForm.description} onChange={(e) => setCourseForm(v => ({ ...v, description: e.target.value }))} required />
              <Field label="Image URL" value={courseForm.imageUrl} onChange={(e) => setCourseForm(v => ({ ...v, imageUrl: e.target.value }))} required />
              <Field label="Price" type="number" step="0.01" value={courseForm.price} onChange={(e) => setCourseForm(v => ({ ...v, price: e.target.value }))} required />
              <div className="card-actions"><button className="btn btn-primary" type="submit">Create</button></div>
            </form>

            <form className="card" onSubmit={handleUpdateCourse}>
              <h3>Update Course</h3>
              <Field label="Course ID" value={updateForm.courseId} onChange={(e) => setUpdateForm(v => ({ ...v, courseId: e.target.value }))} required />
              <Field label="Title" value={updateForm.title} onChange={(e) => setUpdateForm(v => ({ ...v, title: e.target.value }))} />
              <Field label="Description" value={updateForm.description} onChange={(e) => setUpdateForm(v => ({ ...v, description: e.target.value }))} />
              <Field label="Image URL" value={updateForm.imageUrl} onChange={(e) => setUpdateForm(v => ({ ...v, imageUrl: e.target.value }))} />
              <Field label="Price" type="number" step="0.01" value={updateForm.price} onChange={(e) => setUpdateForm(v => ({ ...v, price: e.target.value }))} />
              <div className="card-actions"><button className="btn btn-primary" type="submit">Update</button></div>
            </form>

            <Card title="My Courses">
              <div className="card-actions" style={{ justifyContent: 'space-between' }}>
                <input
                  className="search"
                  placeholder="Search courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn" type="button" onClick={handleListCourses}>Refresh</button>
              </div>
              {filteredCourses.length === 0 ? (
                <p className="muted">No courses found</p>
              ) : (
                <div className="course-grid">
                  {filteredCourses.map(c => (
                    <div className="course-card" key={c._id} onClick={() => prefillUpdate(c)}>
                      {c.imageURL ? (
                        <div className="thumb" style={{ backgroundImage: `url(${c.imageURL})` }} />
                      ) : (
                        <div className="thumb placeholder">No Image</div>
                      )}
                      <div className="course-meta">
                        <div className="row">
                          <h4 className="course-title">{c.title}</h4>
                          <span className="price">₹{c.price}</span>
                        </div>
                        <p className="muted clamp-2">{c.description}</p>
                        <code className="muted small">{c._id}</code>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}
