import type {Book, BookApi, OneBook, OneBookApi, Comment, CommentApi} from "@/lib/types"

const BASE_URL = 'https://pwa-cms.ln1.eu/api'
const DEFAULT_COVER = '/images/default-book-cover.svg'

const BOOKS_PER_PAGE = 6

export async function getBooks(page: number): Promise<{ books: Book[]; totalPages: number }> {
	const resultBrut = await fetch(BASE_URL + '/livres?pagination[page]=' + page + '&pagination[pageSize]=' + BOOKS_PER_PAGE + '&populate=couverture')
	const result = await resultBrut.json()
	return {books: result.data.map(convertBook), totalPages: result.meta.pagination.pageCount}
}

export async function getBookById(id: string): Promise<OneBook | undefined> {
	const resultBrut = await fetch(BASE_URL + '/livres/' + id + '?populate=commentaires')
	const result = await resultBrut.json()
	return convertOneBook(result.data)
}

export async function searchBooks(query: string): Promise<Book[]> {
	const lowercaseQuery = query.toLowerCase()
	const resultBrut = await fetch(BASE_URL + '/livres?filters[titre][$containsi]=' + lowercaseQuery + '&populate=couverture')
	const result = await resultBrut.json()
	return result.data.map(convertBook)
}

export function convertBook(book: BookApi): Book {
	const coverImage = book.couverture?.[0]?.formats?.thumbnail?.url
		? `https://pwa-cms.ln1.eu${book.couverture[0].formats.thumbnail.url}`
		: DEFAULT_COVER

	return {
		id: book.documentId,
		title: book.titre,
		author: book.auteur,
		coverImage,
	}
}

export function convertOneBook(book: OneBookApi): OneBook {
	const coverImage = book.couverture?.[0]?.formats?.thumbnail?.url
		? `https://pwa-cms.ln1.eu${book.couverture[0].formats.thumbnail.url}`
		: DEFAULT_COVER

	return {
		id: book.documentId,
		title: book.titre,
		author: book.auteur,
		coverImage,
		summary: book.description,
		comments: book.commentaires.map(convertComment),
	}
}

function convertComment(comment: CommentApi): Comment {
	return {
		id: comment.id,
		author: comment.auteur,
		content: comment.contenu,
		createdAt: comment.createdAt
	}
}

export async function getComments(bookId: string): Promise<Comment[]> {
	const resultBrut = await fetch(BASE_URL + '/commentaires?filters[livre][$eq]=' + bookId)
	const result = await resultBrut.json()
	return result.data.map(convertComment)
}
