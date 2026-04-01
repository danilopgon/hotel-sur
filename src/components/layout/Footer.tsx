'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='relative z-10 bg-neutral-900 text-neutral-50 py-12 mt-0'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <h3 className='text-xl font-bold mb-4 text-primary'>HOTEL SUR</h3>
            <p className='text-neutral-50'>
              Banda de rock alternativo y electrónica. Cuenca, España.
            </p>
            <div className='mt-4 flex space-x-4'>
              <a
                href='https://www.instagram.com/hotelsur/'
                className='hover:text-primary transition-colors'
              >
                <span className='sr-only'>Instagram</span>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                    clipRule='evenodd'
                  />
                </svg>
              </a>
              <a
                href='https://open.spotify.com/intl-es/artist/5ZsW4wbMl8qYFZ0L9xvBeu'
                className='hover:text-primary transition-colors'
              >
                <span className='sr-only'>Spotify</span>
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <path d='M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.8-.179-.92-.6-.12-.421.18-.8.6-.9C10.5 13.719 14.4 14.14 17.64 16.2c.36.219.48.66.24 1.021l-.36.119zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z' />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className='text-xl font-bold mb-4'>Enlaces</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='/' className='hover:text-primary transition-colors'>
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href='/contacto'
                  className='hover:text-primary transition-colors'
                >
                  Contacto
                </Link>
              </li>
              <li>
                <a
                  href='https://tienda.hotelsur.es'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-primary transition-colors'
                >
                  Merchandising
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-xl font-bold mb-4'>Contacto</h3>
            <p className='text-neutral-50'>
              Para contrataciones y colaboraciones:
            </p>
            <a
              href='mailto:somoshotelsur@gmail.com'
              className='hover:text-primary transition-colors'
            >
              somoshotelsur@gmail.com
            </a>
          </div>
        </div>

        <div className='border-t border-primary mt-12 pt-8 text-center text-sm text-neutral-50'>
          <p>
            © {new Date().getFullYear()} Hotel Sur. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
