import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import Modal from '@/Components/Modal';

export default function Messages({ messages, advisors, auth }: any) {
    const [selectedMessage, setSelectedMessage] = useState<any>(null);
    const [showMobileDetail, setShowMobileDetail] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isComposeOpen, setIsComposeOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        subject: '',
        body: '',
        recipient_id: '',
        parent_id: '',
        attachments: [] as File[],
    });

    const emojis = ['👍', '👋', '😀', '😃', '😄', '😁', '😅', '😂', '😊', '🙂', '😉', '😍', '🥰', '🙏', '🎉', '🔥', '🤔', '😎', '🎓', '📚'];

    // Select first message on load if none selected (desktop)
    useEffect(() => {
        if (!selectedMessage && messages.length > 0 && window.innerWidth >= 768) {
            handleMessageSelect(messages[0]);
        }
    }, [messages]);

    // Update selected message data when messages prop changes
    useEffect(() => {
        if (selectedMessage) {
            const updated = messages.find((m: any) => m.id === selectedMessage.id);
            if (updated) {
                setSelectedMessage(updated);
            }
        }
    }, [messages]);

    // Scroll to bottom of conversation
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [selectedMessage]);

    const handleMessageSelect = (msg: any) => {
        setSelectedMessage(msg);
        setShowMobileDetail(true);
        setData({
            ...data,
            recipient_id: msg.reply_to_id,
            parent_id: msg.id,
            attachments: [],
        });

        // Mark as read if not read
        if (!msg.is_read) {
            router.patch(route('messages.mark-read', msg.id), {}, {
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setData('attachments', [...data.attachments, ...Array.from(e.target.files)]);
        }
    };

    const removeFile = (index: number) => {
        const newFiles = [...data.attachments];
        newFiles.splice(index, 1);
        setData('attachments', newFiles);
    };

    const addEmoji = (emoji: string) => {
        setData('body', data.body + emoji);
        setShowEmojiPicker(false);
    };

    const submitReply = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('messages.store'), {
            onSuccess: () => {
                reset('body', 'attachments');
            },
            preserveScroll: true,
            forceFormData: true,
        });
    };

    const openCompose = () => {
        reset();
        setIsComposeOpen(true);
    };

    const closeCompose = () => {
        setIsComposeOpen(false);
        reset();
    };

    const submitNewMessage = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('messages.store'), {
            onSuccess: () => {
                closeCompose();
                reset();
            },
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout header="Inbox">
            <Head title="Messages" />

            <div className="py-6 md:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg h-[80vh] flex relative">

                        {/* Message List */}
                        <div className={`w-full md:w-1/3 border-r overflow-y-auto ${showMobileDetail ? 'hidden md:block' : 'block'}`}>
                            <div className="p-4 border-b bg-gray-50 flex justify-between items-center sticky top-0 z-10">
                                <h3 className="font-bold text-gray-700">Messages</h3>
                                <div className="flex gap-2 items-center">
                                    <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">{messages.length}</span>
                                    <button
                                        onClick={openCompose}
                                        className="ml-2 bg-primary-600 text-white p-1.5 rounded-full hover:bg-primary-700 transition shadow-sm"
                                        title="New Message"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="divide-y relative">
                                {messages.map((msg: any) => (
                                    <button
                                        key={msg.id}
                                        onClick={() => handleMessageSelect(msg)}
                                        className={`w-full text-left p-4 hover:bg-gray-50 transition ${selectedMessage?.id === msg.id ? 'bg-primary-50 border-l-4 border-primary-600' : 'border-l-4 border-transparent'}`}
                                    >
                                        <div className="flex justify-between mb-1">
                                            <span className={`font-bold text-xs px-2 py-0.5 rounded ${msg.bg_color}`}>{msg.sender}</span>
                                            <span className="text-xs text-gray-400">{msg.date}</span>
                                        </div>
                                        <h4 className={`text-sm font-semibold truncate ${!msg.is_read ? 'text-black font-bold' : 'text-gray-600'}`}>{msg.subject}</h4>
                                        <p className="text-xs text-gray-500 truncate mt-1">{msg.preview}</p>
                                        {msg.attachments && msg.attachments.length > 0 && (
                                            <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
                                                <span>📎 {msg.attachments.length} attachment(s)</span>
                                            </div>
                                        )}
                                    </button>
                                ))}
                                {messages.length === 0 && (
                                    <div className="p-8 text-center text-gray-400 text-sm">
                                        No messages found. Start a conversation!
                                        <button onClick={openCompose} className="text-primary-600 block mt-2 mx-auto font-bold hover:underline">Compose Message</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Message Content */}
                        <div className={`w-full md:w-2/3 flex flex-col bg-gray-100 ${showMobileDetail ? 'fixed inset-0 z-20 md:static' : 'hidden md:flex'}`}>
                            {selectedMessage ? (
                                <>
                                    {/* Header */}
                                    <div className="p-3 border-b flex justify-between items-center bg-white shadow-sm h-16">
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => setShowMobileDetail(false)} className="md:hidden text-gray-500 hover:bg-gray-100 p-2 rounded-full">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                            </button>
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow">
                                                {selectedMessage.sender[0]}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800 leading-tight">{selectedMessage.sender}</div>
                                                <div className="text-xs text-green-500 flex items-center gap-1">
                                                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span> Online
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
                                                title="Details"
                                            >
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Chat Area */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#e5ddd5]" ref={scrollRef} style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundRepeat: 'repeat' }}>
                                        {[selectedMessage, ...(selectedMessage.replies || [])].map((item: any, idx: number) => {
                                            const isMe = item.sender_id === auth.user.id || (item === selectedMessage && item.sender_id === auth.user.id);
                                            const isParent = item === selectedMessage;

                                            return (
                                                <div key={idx} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
                                                    <div className={`max-w-[75%] md:max-w-[60%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                                        <div
                                                            className={`relative px-4 py-2 shadow-sm text-sm ${isMe
                                                                ? 'bg-[#d9fdd3] text-gray-900 rounded-l-lg rounded-tr-none rounded-br-lg'
                                                                : 'bg-white text-gray-900 rounded-r-lg rounded-tl-none rounded-bl-lg'
                                                                }`}
                                                        >
                                                            {isParent && (
                                                                <div className="text-xs font-bold text-gray-500 mb-1 pb-1 border-b border-gray-200/50 block">
                                                                    Subject: {item.subject}
                                                                </div>
                                                            )}
                                                            <div className="whitespace-pre-wrap leading-relaxed">{item.body}</div>

                                                            {item.attachments && item.attachments.length > 0 && (
                                                                <div className="mt-2 pt-2 border-t border-gray-500/10">
                                                                    {item.attachments.map((att: any, aIdx: number) => (
                                                                        <a
                                                                            key={aIdx}
                                                                            href={`/storage/${att.path}`}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="flex items-center gap-2 bg-black/5 p-2 rounded mb-1 last:mb-0 hover:bg-black/10 transition"
                                                                        >
                                                                            <span className="text-lg">📄</span>
                                                                            <span className="text-xs truncate max-w-[150px] underline">{att.name}</span>
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            )}

                                                            <div className={`text-[10px] mt-1 text-right ${isMe ? 'text-green-800/60' : 'text-gray-400'}`}>
                                                                {item.date}
                                                                {isMe && <span className="ml-1">✓✓</span>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* File Preview Area */}
                                    {data.attachments.length > 0 && (
                                        <div className="px-4 pt-2 -mb-2 flex gap-2 overflow-x-auto bg-[#f0f2f5]">
                                            {data.attachments.map((file, idx) => (
                                                <div key={idx} className="relative bg-white rounded-lg p-2 border shadow-sm flex items-center gap-2 min-w-[150px]">
                                                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-xs">📎</div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-xs font-semibold truncate">{file.name}</div>
                                                        <div className="text-[10px] text-gray-500">{(file.size / 1024).toFixed(1)} KB</div>
                                                    </div>
                                                    <button type="button" onClick={() => removeFile(idx)} className="text-gray-400 hover:text-red-500">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Composer */}
                                    <div className="p-3 bg-[#f0f2f5] border-t flex items-end gap-2">
                                        <input
                                            type="file"
                                            multiple
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleFileSelect}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition mb-1"
                                        >
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                                        </button>
                                        <div className="flex-1 bg-white rounded-2xl border border-gray-200 focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-300 shadow-sm relative">
                                            <textarea
                                                value={data.body}
                                                onChange={(e) => setData('body', e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        submitReply(e);
                                                    }
                                                }}
                                                placeholder="Type a message"
                                                className="w-full border-none rounded-2xl focus:ring-0 resize-none py-3 px-4 max-h-32 min-h-[44px] bg-transparent text-gray-800 placeholder-gray-500"
                                                rows={1}
                                                style={{ height: 'auto' }}
                                            ></textarea>
                                            <div className="absolute right-2 bottom-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                                    className="p-1 text-gray-400 hover:text-yellow-500 transition"
                                                >
                                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                </button>
                                                {showEmojiPicker && (
                                                    <div className="absolute bottom-10 right-0 bg-white shadow-xl border rounded-lg p-2 w-64 grid grid-cols-5 gap-1 z-50">
                                                        {emojis.map((emoji) => (
                                                            <button key={emoji} type="button" onClick={() => addEmoji(emoji)} className="text-xl hover:bg-gray-100 p-1 rounded font-emoji">{emoji}</button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={submitReply}
                                            disabled={!data.body.trim() || processing}
                                            className={`p-3 rounded-full shadow-sm transition mb-1 ${data.body.trim() ? 'bg-[#00a884] text-white hover:bg-[#008f6f]' : 'bg-gray-200 text-gray-400'}`}
                                        >
                                            {processing ? (
                                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            ) : (
                                                <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg>
                                            )}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-[#f0f2f5] border-l border-gray-200">
                                    <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-6">
                                        <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>
                                    </div>
                                    <h3 className="text-2xl font-light text-gray-700 mb-2">EducationForLiberty Web</h3>
                                    <p className="text-sm">Send and receive messages with {auth.user.role === 'student' ? 'your advisors' : 'students'}.</p>
                                    <p className="text-sm mt-4 text-gray-400 flex items-center gap-1"><span className="text-xs">🔒</span> End-to-end encrypted</p>

                                    <button
                                        onClick={openCompose}
                                        className="mt-8 px-6 py-3 bg-[#00a884] text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-[#008f6f] transition transform hover:-translate-y-1"
                                    >
                                        Start a New Chat
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Compose Modal */}
            <Modal show={isComposeOpen} onClose={closeCompose}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">New Message</h2>
                    <form onSubmit={submitNewMessage}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                            <select
                                value={data.recipient_id}
                                onChange={(e) => setData('recipient_id', e.target.value)}
                                className="w-full border-gray-300 rounded-lg focus:border-primary-500 focus:ring-primary-500"
                                required
                            >
                                <option value="">Select a Recipient</option>
                                {advisors && advisors.map((advisor: any) => (
                                    <option key={advisor.id} value={advisor.id}>
                                        {advisor.name} ({advisor.role})
                                    </option>
                                ))}
                            </select>
                            {errors.recipient_id && <div className="text-red-500 text-xs mt-1">{errors.recipient_id}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <input
                                type="text"
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                                className="w-full border-gray-300 rounded-lg focus:border-primary-500 focus:ring-primary-500"
                                placeholder="Subject"
                                required
                            />
                            {errors.subject && <div className="text-red-500 text-xs mt-1">{errors.subject}</div>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea
                                value={data.body}
                                onChange={(e) => setData('body', e.target.value)}
                                className="w-full border-gray-300 rounded-lg focus:border-primary-500 focus:ring-primary-500 min-h-[150px]"
                                placeholder="Write your message here..."
                                required
                            ></textarea>
                            {errors.body && <div className="text-red-500 text-xs mt-1">{errors.body}</div>}
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={closeCompose}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center"
                            >
                                {processing ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
