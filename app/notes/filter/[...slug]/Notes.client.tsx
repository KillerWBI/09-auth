"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { useDebounce } from "use-debounce";
import Modal from '../../../../components/Modal/Modal';
import NoteForm from '../../../../components/NoteForm/NoteForm';
import NoteList from '../../../../components/NoteList/NoteList';
import Pagination from "../../../../components/Pagination/Pagination";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import type { NotesResponse } from "../../../../lib/api";
import { fetchNotes } from "../../../../lib/api";
import css from './NotesPage.module.css';


interface NotesClientProps {
  tag: string;
}


export default function NotesClient({ tag }: NotesClientProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery<NotesResponse>({
    queryKey: ['notes', debouncedQuery, currentPage, tag],
    queryFn: () => fetchNotes(debouncedQuery, currentPage, tag),
    enabled: true,
    placeholderData: (prev) => prev,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery]);

  const handleSearch = (value: string) => setQuery(value);
  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox handleSearch={handleSearch} />
          {data && data.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={data.totalPages}
              onPageChange={handlePageChange}
            />
          )}

          <Link className={css.button} href={`/notes/action/create`}>Create note +</Link>

        </header>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading notes</p>}
        {data && <NoteList notes={data.notes} />}
      </div>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <NoteForm />
        </Modal>
      )}
    </>
  );
}
