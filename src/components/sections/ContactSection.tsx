import { SectionTitle } from '../ui';
import { useForm }      from '../../hooks/useForm';
import styles           from './ContactSection.module.css';

/* ── Types ── */
type ContactFormValues = {
  name:          string;
  email:         string;
  phone:         string;
  service:       string;
  message:       string;
  preferredDate: string;
};

type ContactErrors = Partial<Record<keyof ContactFormValues, string>>;

/* ── Static data ── */
const SERVICES = [
  'Teeth Whitening',
  'Dental Implants',
  'Orthodontics',
  'Root Canal',
  'Preventive Care',
  'Porcelain Veneers',
];

const initialValues: ContactFormValues = {
  name: '', email: '', phone: '', service: '', message: '', preferredDate: '',
};

function validate(values: ContactFormValues): ContactErrors {
  const e: ContactErrors = {};
  if (!values.name.trim())
    e.name = 'Full name is required';
  else if (values.name.trim().length < 2)
    e.name = 'Name must be at least 2 characters';

  if (!values.email.trim())
    e.email = 'Email address is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    e.email = 'Enter a valid email address';

  if (values.phone && !/^\+?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(values.phone))
    e.phone = 'Enter a valid phone number';

  if (!values.service)
    e.service = 'Please select a service';

  if (!values.message.trim())
    e.message = 'Message is required';
  else if (values.message.trim().length < 10)
    e.message = 'Message must be at least 10 characters';

  return e;
}

/* Simulates API call — swap for real fetch() */
async function submitContact(): Promise<void> {
  await new Promise<void>(resolve => setTimeout(resolve, 1500));
}

/* ── Input class helper ── */
function fieldClass(
  base: string,
  touched: boolean | undefined,
  error: string | undefined,
  value: string,
  s: Record<string, string>,
): string {
  return [
    s[base],
    touched && error      ? s['contact-form__field--error']   : '',
    touched && !error && value ? s['contact-form__field--success'] : '',
  ]
    .filter(Boolean)
    .join(' ');
}

/* ── Component ── */
export default function ContactSection() {
  const {
    values, errors, touched, isSubmitting, isSuccess,
    handleChange, handleBlur, handleSubmit, reset,
  } = useForm<ContactFormValues>(initialValues, validate);

  const today = new Date().toLocaleDateString('en-CA'); // local YYYY-MM-DD

  return (
    <section id="contact" className={styles['contact-section']} aria-labelledby="contact-heading">
      <div className={styles['contact-section__container']}>
        <SectionTitle
          eyebrow="Get in Touch"
          heading="Book Your Appointment"
          sub="Ready for a healthier smile? Fill out the form below and we'll reach out within 24 hours."
          align="center"
        />

        <div className={styles['contact-section__inner']}>

          {/* ── Left: Form ── */}
          <div className={styles['contact-section__form-col']}>
            {isSuccess ? (
              /* Success state */
              <div
                className={styles['contact-form__success']}
                role="status"
                aria-live="polite"
              >
                <span className={styles['contact-form__success-icon']}>
                  <svg viewBox="0 0 48 48" width="56" height="56" aria-hidden="true" focusable="false">
                    <circle cx="24" cy="24" r="24" fill="var(--color-teal)" />
                    <path
                      d="M14 24.5l7 7 13-14"
                      stroke="#fff"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
                <h3 className={styles['contact-form__success-title']}>Message sent</h3>
                <p className={styles['contact-form__success-text']}>
                  Thank you for contacting NEU Dental. Our team will be in touch shortly.
                </p>
                <button className={styles['contact-form__reset-btn']} onClick={reset}>
                  Send another message
                </button>
              </div>
            ) : (
              /* Form */
              <form
                className={styles['contact-form']}
                onSubmit={handleSubmit(submitContact)}
                noValidate
                aria-label="Contact form"
              >
                {/* Row 1: name + email */}
                <div className={styles['contact-form__row']}>
                  {/* Name */}
                  <div className={styles['contact-form__group']}>
                    <label className={styles['contact-form__label']} htmlFor="cf-name">
                      Full Name <span aria-hidden="true" className={styles['contact-form__required']}>*</span>
                    </label>
                    <input
                      id="cf-name"
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Jane Smith"
                      autoComplete="name"
                      className={fieldClass('contact-form__input', touched.name, errors.name, values.name, styles)}
                      aria-invalid={!!(touched.name && errors.name)}
                      aria-describedby={touched.name && errors.name ? 'err-name' : undefined}
                    />
                    {touched.name && errors.name && (
                      <span id="err-name" className={styles['contact-form__error']} role="alert">{errors.name}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className={styles['contact-form__group']}>
                    <label className={styles['contact-form__label']} htmlFor="cf-email">
                      Email Address <span aria-hidden="true" className={styles['contact-form__required']}>*</span>
                    </label>
                    <input
                      id="cf-email"
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="jane@example.com"
                      autoComplete="email"
                      className={fieldClass('contact-form__input', touched.email, errors.email, values.email, styles)}
                      aria-invalid={!!(touched.email && errors.email)}
                      aria-describedby={touched.email && errors.email ? 'err-email' : undefined}
                    />
                    {touched.email && errors.email && (
                      <span id="err-email" className={styles['contact-form__error']} role="alert">{errors.email}</span>
                    )}
                  </div>
                </div>

                {/* Row 2: phone + date */}
                <div className={styles['contact-form__row']}>
                  {/* Phone */}
                  <div className={styles['contact-form__group']}>
                    <label className={styles['contact-form__label']} htmlFor="cf-phone">
                      Phone{' '}
                      <span className={styles['contact-form__optional']}>(optional)</span>
                    </label>
                    <input
                      id="cf-phone"
                      type="tel"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="+1 (555) 234-5678"
                      autoComplete="tel"
                      className={fieldClass('contact-form__input', touched.phone, errors.phone, values.phone, styles)}
                      aria-invalid={!!(touched.phone && errors.phone)}
                      aria-describedby={touched.phone && errors.phone ? 'err-phone' : undefined}
                    />
                    {touched.phone && errors.phone && (
                      <span id="err-phone" className={styles['contact-form__error']} role="alert">{errors.phone}</span>
                    )}
                  </div>

                  {/* Preferred date */}
                  <div className={styles['contact-form__group']}>
                    <label className={styles['contact-form__label']} htmlFor="cf-date">
                      Preferred Date{' '}
                      <span className={styles['contact-form__optional']}>(optional)</span>
                    </label>
                    <input
                      id="cf-date"
                      type="date"
                      name="preferredDate"
                      value={values.preferredDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      min={today}
                      className={`${styles['contact-form__input']} ${styles['contact-form__input--date']}`}
                    />
                  </div>
                </div>

                {/* Service select */}
                <div className={styles['contact-form__group']}>
                  <label className={styles['contact-form__label']} htmlFor="cf-service">
                    Service <span aria-hidden="true" className={styles['contact-form__required']}>*</span>
                  </label>
                  <div className={styles['contact-form__select-wrap']}>
                    <select
                      id="cf-service"
                      name="service"
                      value={values.service}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={fieldClass('contact-form__select', touched.service, errors.service, values.service, styles)}
                      aria-invalid={!!(touched.service && errors.service)}
                      aria-describedby={touched.service && errors.service ? 'err-service' : undefined}
                    >
                      <option value="">Select a service…</option>
                      {SERVICES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <span className={styles['contact-form__select-arrow']} aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="16" height="16" focusable="false">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                  {touched.service && errors.service && (
                    <span id="err-service" className={styles['contact-form__error']} role="alert">{errors.service}</span>
                  )}
                </div>

                {/* Message */}
                <div className={styles['contact-form__group']}>
                  <label className={styles['contact-form__label']} htmlFor="cf-message">
                    Message <span aria-hidden="true" className={styles['contact-form__required']}>*</span>
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Tell us about your dental concerns or questions…"
                    rows={4}
                    className={fieldClass('contact-form__textarea', touched.message, errors.message, values.message, styles)}
                    aria-invalid={!!(touched.message && errors.message)}
                    aria-describedby={touched.message && errors.message ? 'err-message' : undefined}
                  />
                  {touched.message && errors.message && (
                    <span id="err-message" className={styles['contact-form__error']} role="alert">{errors.message}</span>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles['contact-form__submit']}
                  aria-label={isSubmitting ? 'Sending your message…' : 'Send message'}
                >
                  {isSubmitting ? (
                    <>
                      <span className={styles['contact-form__spinner']} aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* ── Right: Info + map ── */}
          <div className={styles['contact-section__info-col']}>
            <div className={styles['contact-info']}>
              <h3 className={styles['contact-info__heading']} id="contact-heading">
                Visit Our Clinic
              </h3>

              <ul className={styles['contact-info__list']} role="list">
                {/* Address */}
                <li className={styles['contact-info__item']}>
                  <span className={styles['contact-info__icon']} aria-label="Address">
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" fill="var(--color-teal)" />
                    </svg>
                  </span>
                  <div>
                    <strong className={styles['contact-info__label']}>Address</strong>
                    <address className={styles['contact-info__address']}>
                      123 Dental Plaza, Suite 200<br />
                      New York, NY 10001
                    </address>
                  </div>
                </li>

                {/* Phone */}
                <li className={styles['contact-info__item']}>
                  <span className={styles['contact-info__icon']} aria-label="Phone">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true" focusable="false">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.32 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <strong className={styles['contact-info__label']}>Phone</strong>
                    <a href="tel:+15552345678" className={styles['contact-info__link']}>+1 (555) 234-5678</a>
                  </div>
                </li>

                {/* Email */}
                <li className={styles['contact-info__item']}>
                  <span className={styles['contact-info__icon']} aria-label="Email">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true" focusable="false">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <polyline points="22,6 12,13 2,6" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <strong className={styles['contact-info__label']}>Email</strong>
                    <a href="mailto:hello@neudental.com" className={styles['contact-info__link']}>hello@neudental.com</a>
                  </div>
                </li>

                {/* Hours */}
                <li className={styles['contact-info__item']}>
                  <span className={styles['contact-info__icon']} aria-label="Opening hours">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true" focusable="false">
                      <circle cx="12" cy="12" r="10" stroke="var(--color-teal)" strokeWidth="2" />
                      <polyline points="12 6 12 12 16 14" stroke="var(--color-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <strong className={styles['contact-info__label']}>Hours</strong>
                    <p className={styles['contact-info__hours']}>Mon – Fri: 8:00 AM – 6:00 PM</p>
                    <p className={styles['contact-info__hours']}>Saturday: 9:00 AM – 3:00 PM</p>
                    <p className={styles['contact-info__hours']}>Sunday: Closed</p>
                  </div>
                </li>
              </ul>

              {/* Map */}
              <div className={styles['contact-info__map']}>
                <iframe
                  title="NEU Dental — Midtown Manhattan location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841!2d-73.9855!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9aeb1c6b5%3A0x35b1cfbc89a6097f!2sMidtown%20Manhattan%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1683000000000"
                  width="100%"
                  height="220"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Map showing NEU Dental clinic location in Midtown Manhattan"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
